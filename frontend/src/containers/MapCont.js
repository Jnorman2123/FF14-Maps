import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/esm/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

class MapCont extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled_quests: [],
        }
    }

    toggleQuest = (quest) => {
        if (!this.state.toggled_quests.includes(quest)) {
            this.setState({
                toggled_quests: [...this.state.toggled_quests, quest],
            })
        } else {
            this.setState({
                toggled_quests: this.state.toggled_quests.filter(q => q !== quest),
            })
        }
    }

    render() {
        let mapName = this.props.mapName.split(' ').join('');
        let active_classes = this.props.classes.filter(c => c.active).map(ac => ac.name);
        let active_quest_types = this.props.quest_types.filter(t => t.active).map(at => at.name);
        let active_quest_levels = this.props.quest_levels.filter(l => l.active);
        let lvls = active_quest_levels.map(l => l.name);
        let lvl_ranges = lvls.map(l => l.split("-").map(i => parseInt(i)));
        let in_zone_quests = [];
        let active_in_zone_quests = [];
        let quest_starters = [];
        let map_markers = [];

        let npcs = this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName))
        let npc_ids = npcs.map(n => n.id);
        this.props.quests.quests.map(q => {
            q.quest_npcs.map(npc => {
                if (npc_ids.includes(npc) && !in_zone_quests.includes(q)) {
                    in_zone_quests.push(q);
                }
                return in_zone_quests;
            })
            return in_zone_quests;
        })
        
        in_zone_quests.map(q => {
            if ((active_classes.includes(q.quest_class) || q.quest_class === 'All') 
            && active_quest_types.includes(q.quest_type)) {
                lvl_ranges.map(lr => {
                    if ((q.quest_level >= lr[0] && q.quest_level <= lr[1]) && !active_in_zone_quests.includes(q)) {
                        active_in_zone_quests.push(q);
                    }
                    return active_in_zone_quests;
                })
                return active_in_zone_quests;
            }
            return active_in_zone_quests;
        })

        active_in_zone_quests.map(quest => {   
            this.props.steps.steps.filter(step => step.quest_step === quest.id).map(s => {
                if (s.step_npc === quest.quest_npcs[0] && !quest_starters.includes(s)) {
                    quest_starters.push(s);
                }
                return quest_starters;
            })
            return quest_starters;
        });

        let inactive_in_zone_quests = in_zone_quests.filter(q => !active_in_zone_quests.includes(q));
        inactive_in_zone_quests.map(quest => {
            this.props.steps.steps.filter(step => step.quest_step === quest.id).map(s => {
                if (quest.quest_npcs.includes(s.step_npc)) {
                    return quest_starters = quest_starters.filter(qs => qs !== s.step_npc);
                }
                return quest_starters;
            })
            return quest_starters;
        })

        quest_starters.map(step => {
            let step_npc = npcs.filter(npc => npc.id === step.step_npc);
            if (step_npc[0] !== undefined) {
                if (!map_markers.includes(step_npc[0])) {
                    map_markers.push(step_npc[0]);
                }               
            }
            return null;
        });

        this.state.toggled_quests.map(q => {
            let npc = null;
            q.quest_npcs.map(npc_id => {
                npc = npcs.filter(n => n.id === npc_id);
                if (!map_markers.includes(npc[0])) {
                    map_markers.push(npc[0]);
                }
                return map_markers;
            })
            return map_markers;
        })

        console.log(map_markers);

        return (    
            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={false} style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url={`./maps/${mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    {map_markers.map(m => {
                        return <Marker key={Math.random()} position={this.props.revertLat(m.npc_location_x, m.npc_location_y)} >
                            <Popup>
                                 <h6 className='text-center'>{m.npc_name}</h6>
                                <ol>
                                    {this.props.steps.steps.filter(s => s.step_npc === m.id).map(npc_step => {
                                        let quest_step = this.props.quests.quests.filter(q => q.id === npc_step.quest_step)
                                        return <li key={npc_step.step_description} quest_id={npc_step.quest_step} 
                                        onClick={this.props.setQuestId} >
                                            {npc_step.step_description} ({quest_step[0].quest_name})
                                        </li>
                                    })}
                                </ol>
                            </Popup>
                        </Marker>
                    })}
                </MapContainer>
                <Accordion>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Available Quests</Accordion.Header>
                        <Accordion.Body>
                            {active_in_zone_quests.map(quest => {
                                let theme = '';
                                if (this.state.toggled_quests.length > 0 && this.state.toggled_quests.includes(quest)) {
                                    theme = 'btn-primary';
                                } else {
                                    theme = 'btn-secondary';
                                };
                                return <Container key={quest.quest_name}>
                                    <Row>
                                        <Col>
                                            <Button size='sm' key={quest.quest_name} id='toggle-check' className={theme} type='checkbox'
                                            onClick={() => this.toggleQuest(quest)}>
                                                Toggle On/Off
                                            </Button>
                                        </Col>
                                        <Col><p>{quest.quest_name}</p></Col>
                                    </Row>
                                </Container>
                            })}      
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            
        );
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(MapCont);