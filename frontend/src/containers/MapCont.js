import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay, LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
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

    toggleQuest = (quest, quest_col) => {
        if (!this.state.toggled_quests.includes(quest) && quest_col.includes(quest)) {
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
        let quest_turn_ins = [];

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
            let quest_job_names = [];
            q.quest_class.map(c => {
                let job_name = this.props.jobs.jobs.filter(job => job.id === c);
                quest_job_names.push(job_name[0].job_name);
                return quest_job_names;
            })

            quest_job_names.map(name => {
                if ((active_classes.includes(name) || name === 'All') 
                && active_quest_types.includes(q.quest_type)) {
                    lvl_ranges.map(lr => {
                        if ((q.quest_level >= lr[0] && q.quest_level <= lr[1]) && !active_in_zone_quests.includes(q)) {
                            let quest_type_icon = '';
                            if (q.quest_type === 'Hunting Log') {
                                quest_type_icon = `./icons/fourth_layer/HuntingLogQuestIcon.PNG`;
                            } else if (q.quest_type === 'Main Story') {
                                quest_type_icon = `./icons/fourth_layer/MainQuestIcon.PNG`;
                            } else {
                                quest_type_icon = `./icons/fourth_layer/${q.quest_type}QuestIcon.PNG`;
                            }
                            active_in_zone_quests.push([q, `./icons/second_layer/BgColor${active_in_zone_quests.length + 1}.PNG`,
                            quest_type_icon]);
                        }
                        return active_in_zone_quests;
                    })
                    return active_in_zone_quests;
                }
                return active_in_zone_quests;
            })
            return active_in_zone_quests;
        })

        active_in_zone_quests.map(quest => {   
            this.props.steps.steps.filter(step => step.quest_step === quest[0].id).map(s => {
                if (s.step_npc === quest[0].quest_npcs[0]) {
                    quest_starters.push(s);
                }
                return quest_starters;
            })
            return quest_starters;
        });

        quest_starters.map(step => {
            let step_npc = npcs.filter(npc => npc.id === step.step_npc);
            let step_quest = active_in_zone_quests.filter(q => q[0].id === step.quest_step)
            if (step_npc[0] !== undefined) {
                map_markers.push([step_npc[0], step_quest[0][1], step_quest[0][2]]);
            }
            return null;
        });

        in_zone_quests.map(q => {
            let quest_steps = this.props.steps.steps.filter(s => s.quest_step === q.id)
            quest_turn_ins.push(quest_steps.pop());
            return quest_turn_ins;
        })

        this.state.toggled_quests.map(q => {
            let npc = null;
            let active_quest = active_in_zone_quests.filter(aq => aq[0].id === q.id);
            q.quest_npcs.map(npc_id => {
                npc = npcs.filter(n => n.id === npc_id);
                if (active_quest[0] !== undefined) {
                    map_markers.push([npc[0], active_quest[0][1], active_quest[0][2]]);
                }
                return map_markers;
            })
            return map_markers;
        })

        return (    
            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '100%'}} >
                    <ImageOverlay url={`./maps/${mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    <MarkerClusterGroup>
                        {map_markers.map(m => {
                            let quest_starter_npcs = quest_starters.map(qs => qs.step_npc);
                            let quest_turn_in_npcs = quest_turn_ins.map(qt => qt.step_npc);
                            let marker_index = null;
                            let stepIcon = null;
                            let stepIconUrl = '';
                            let colorIcon = null;
                            let iconContainer = null;
                            let typeIcon = null;
                            if (m[0] !== undefined) {
                                let marker_quest = this.state.toggled_quests.filter(q => q.quest_npcs.includes(m[0].id))

                                if (marker_quest.length === 1) {
                                    marker_index = marker_quest[0].quest_npcs.findIndex(n => n === m[0].id);
                                }
                                if (quest_starter_npcs.includes(m[0].id)) {
                                    stepIconUrl = `./icons/third_layer/StartIcon.PNG`;
                                } else if (quest_turn_in_npcs.includes(m[0].id)) {
                                    stepIconUrl = `./icons/third_layer/TurnInIcon.PNG`;
                                } else {
                                    stepIconUrl = `./icons/third_layer/Step${marker_index}Icon.PNG`;
                                }

                                iconContainer = new L.Icon({
                                    iconUrl: `./icons/first_layer/IconContainer.PNG`,
                                    iconRetinaUrl: `./icons/first_layer/IconContainer.PNG`,
                                    popupAnchor: [0, 0],
                                    iconSize: [45, 45],
                                })

                                stepIcon = new L.Icon({
                                    iconUrl: stepIconUrl,
                                    iconRetinaUrl: stepIconUrl,
                                    popupAnchor: [0, 0],
                                    iconSize: [45, 45],
                                })

                                colorIcon = new L.Icon({
                                    iconUrl: m[1],
                                    iconRetinaUrl: m[1],
                                    popupAnchor: [0, 0],
                                    iconSize: [45, 45],
                                })

                                typeIcon = new L.Icon({
                                    iconUrl: m[2],
                                    iconRetinaUrl: m[2],
                                    popupAnchor: [0, 0],
                                    iconSize: [45, 45],
                                })

                                return <LayerGroup key={Math.random()}>
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(m[0].npc_location_x, m[0].npc_location_y)} 
                                    icon={colorIcon} children={true} >
                                    </Marker>
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(m[0].npc_location_x, m[0].npc_location_y)} icon={iconContainer} >
                                    </Marker>
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(m[0].npc_location_x, m[0].npc_location_y)} icon={stepIcon} >
                                    </Marker>
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(m[0].npc_location_x, m[0].npc_location_y)} icon={typeIcon} >
                                        <Popup>
                                            <h6 className='text-center'>{m[0].npc_name}</h6>
                                            <ol>
                                                {this.props.steps.steps.filter(s => s.step_npc === m[0].id).map(npc_step => {
                                                    let quest_step = this.props.quests.quests.
                                                    filter(q => q.id === npc_step.quest_step)
                                                    return <li key={npc_step.step_description} quest_id={npc_step.quest_step} 
                                                    onClick={this.props.setQuestId} >
                                                        {npc_step.step_description} ({quest_step[0].quest_name})
                                                    </li>
                                                })}
                                            </ol>
                                        </Popup>
                                    </Marker>
                                </LayerGroup>
                            }
                            return null;
                        })}
                    </MarkerClusterGroup>
                </MapContainer>
                <Accordion>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Available Quests</Accordion.Header>
                        <Accordion.Body>
                            {active_in_zone_quests.map(quest => {
                                let theme = '';
                                if (this.state.toggled_quests.length > 0 && this.state.toggled_quests.includes(quest[0])) {
                                    theme = 'btn-primary';
                                } else {
                                    theme = 'btn-secondary';
                                };
                                return <Container key={quest[0].quest_name}>
                                    <Row>
                                        <Col>
                                            <Button size='sm' key={quest.quest_name} id='toggle-check' className={theme} 
                                            type='checkbox' onClick={() => this.toggleQuest(quest[0], 
                                            active_in_zone_quests.map(q => q[0]))}>
                                                Toggle On/Off
                                            </Button>
                                        </Col>
                                        <Col><p>{quest[0].quest_name}</p></Col>
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
    items: storeData.items,
    npcs: storeData.npcs,
    quests: storeData.quests,
    rewards: storeData.rewards,
    steps: storeData.steps,
    jobs: storeData.jobs,
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(MapCont);