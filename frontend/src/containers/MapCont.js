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
            map_markers: [],
        }
    }

    toggleQuest = (quest) => {
        let add_npcs = [];
        let remove_npcs = [];

        quest.quest_npcs.map(npc_id => {
            let npc = this.props.npcs.npcs.filter(npc => npc.id === npc_id);
            if (!this.state.map_markers.includes(npc[0])) {
                add_npcs.push(npc[0]);
                return add_npcs;
            } else {
                remove_npcs.push(npc[0]);
                return remove_npcs;
            }
            
        })
        if (this.state.toggled_quests.length === 0 || !this.state.toggled_quests.includes(quest)) {
            this.setState({
                toggled_quests: [...this.state.toggled_quests, quest],
                map_markers: this.state.map_markers.concat(add_npcs)
            });
        } else if (this.state.toggled_quests.length > 0 && this.state.toggled_quests.includes(quest)) {
            this.setState({
                toggled_quests: this.state.toggled_quests.filter(q => q !== quest),
                map_markers: this.state.map_markers.filter(m => !remove_npcs.includes(m))
            });
        }
    }

    render() {
        let mapName = this.props.mapName.split(' ');
        let joinedName = mapName.join('');
        let active_classes = this.props.classes.filter(c => c.active).map(ac => ac.name);
        let active_quest_types = this.props.quest_types.filter(t => t.active).map(at => at.name);
        let active_quest_levels = this.props.quest_levels.filter(l => l.active);
        let lvls = active_quest_levels.map(l => l.name);
        let lvl_ranges = lvls.map(l => l.split("-").map(i => parseInt(i)));
        let active_quests = [];

        this.props.quests.quests.map(q => {
            if ((active_classes.includes(q.quest_class) || q.quest_class === 'All') 
            && active_quest_types.includes(q.quest_type)) {
                lvl_ranges.map(lr => {
                    if (q.quest_level >= lr[0] && q.quest_level <= lr[1]) {
                        active_quests.push(q);
                    }
                    return active_quests;
                })
                return active_quests;
            }
            return active_quests;
        })

        let npcs = this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName))
        let npc_ids = npcs.map(n => n.id);
        let activeInZoneQuests = [];
        let quest_starters = [];
        active_quests.map(aq => {
            let inZone = false;
            aq.quest_npcs.map(npc => {
                if (npc_ids.includes(npc)) {
                    inZone = true;
                }
                return inZone
            })
            if (inZone) {
                activeInZoneQuests.push(aq);
            }
            return activeInZoneQuests;
        })

        active_quests.map(quest => {   
            this.props.steps.steps.filter(step => step.quest_step === quest.id).map(s => {
                if (s.step_npc === quest.quest_npcs[0]) {
                    quest_starters.push(s);
                }
                return quest_starters;
            })
            return quest_starters.map(step => {
                let step_npc = npcs.filter(npc => npc.id === step.step_npc);
                if (step_npc[0] !== undefined) {
                    if (!this.state.map_markers.includes(step_npc[0])) {
                        this.state.map_markers.push(step_npc[0]);
                    }               
                }
                return null;
            });
        });
        
        return (    
            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={false} style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url={`./maps/${joinedName}.png`} bounds={this.props.bounds} opacity={1} />
                    {this.state.map_markers.map(m => {
                        return <Marker key={Math.random()} position={this.props.revertLat(m.npc_location_x, m.npc_location_y)} >
                            <Popup>
                                <ol>
                                    {this.props.steps.steps.filter(s => s.step_npc === m.id).map(npc_step => {
                                        console.log(npc_step);
                                        return <li key={npc_step.step_description}>{npc_step.step_description}</li>
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
                            {activeInZoneQuests.map(quest => {
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