import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay, LayerGroup, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L, { circle } from 'leaflet';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/esm/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import '../App.css';

class ZoneMapCont extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled_quests: [],
        }
    }

    toggleQuest = (marker, quest_col) => {
        if (!this.state.toggled_quests.includes(marker.quest) && quest_col.includes(marker.quest)) {
            this.setState({
                toggled_quests: [...this.state.toggled_quests, marker.quest],
            })
        } else {
            this.setState({
                toggled_quests: this.state.toggled_quests.filter(q => q !== marker.quest),
            })
        }
    }

    render() {
        let mapName = this.props.mapName.split(' ').join('');
        let active_in_zone_quests = [];
        let map_markers = [];
        let npcs = this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName));
        let npc_ids = npcs.map(n => n.id);
        let i = 0;
        let active_quest_marker_data = [];

        this.props.active_quests.map(q => {
            q.quest_npcs.map(npc => {
                if (npc_ids.includes(npc) && !active_in_zone_quests.includes(q)) {
                    active_in_zone_quests.push(q);
                }
                return active_in_zone_quests;
            })
            return active_in_zone_quests
        })

        active_in_zone_quests.map(aq => {
            let quest_type_icon = '';
            let start_icon = '';
            let turn_in_icon = '';
            let active_start_icon = '';
            i++;
            let bg_color = `./icons/second_layer/BgColor${i}.png`;

            if (aq.quest_type === 'Main Story') {
                quest_type_icon = `./icons/fourth_layer/MainQuestIcon.png`;
                start_icon = `./icons/cluster_icons/MainStoryStartIcon.png`;
                active_start_icon = `./icons/cluster_icons/MainStoryStartIconActive.png`;
                turn_in_icon = `./icons/cluster_icons/MainStoryTurninIcon.png`;
            } else if (aq.quest_type === 'Class') {
                quest_type_icon = `./icons/fourth_layer/ClassQuestIcon.png`;
                start_icon = `./icons/cluster_icons/ClassStartIcon.png`;
                active_start_icon = `./icons/cluster_icons/ClasStartIconActive.png`;
                turn_in_icon = `./icons/cluster_icons/ClassTurninIcon.png`;
            } else if (aq.quest_type === 'Side') {
                quest_type_icon = `./icons/fourth_layer/SideQuestIcon.png`;
                start_icon = `./icons/cluster_icons/SideStartIcon.png`;
                active_start_icon = `./icons/cluster_icons/SideStartIconActive.png`;
                turn_in_icon = `./icons/cluster_icons/SideTurninIcon.png`;
            } else {
                quest_type_icon = `./icons/fourth_layer/HuntingLogQuestIcon.png`;
                start_icon = `./icons/cluster_icons/HuntingLogStartIcon.png`;
                active_start_icon = `./icons/cluster_icons/HuntingLogStartIconActive.png`;
                turn_in_icon = `./icons/cluster_icons/HuntingLogTurninIcon.png`;
            } 
            return active_quest_marker_data.push([aq, quest_type_icon, start_icon, turn_in_icon, bg_color, active_start_icon]);
        })

        let quest_starters = [];
        let quest_turn_ins = [];
        let quest_steps = [];

        active_quest_marker_data.map(q => {
            let index = 0;
            let starter = npcs.filter(n => n.id === q[0].quest_npcs[0]);
            let turn_in = npcs.filter(n => n.id === q[0].quest_npcs[q[0].quest_npcs.length - 1]);
            let steps = q[0].quest_npcs.slice(1, -1);
            let step_npcs = steps.map(s => {
                return npcs.filter(n => n.id === s)[0];
            })
            if (starter[0] !== undefined) {
                quest_starters.push({npc: starter[0], quest: q[0], start_icon: q[2], bg_color: q[4], 
                active_start_icon: q[5] });
            }
            if (turn_in[0] !== undefined) {
                quest_turn_ins.push({npc: turn_in[0], quest: q[0], turn_in_icon: q[3], bg_color: q[4] });
            }
            step_npcs.map(npc => {
                index ++;
                if (npc !== undefined) {
                    quest_steps.push({npc: npc, quest: q[0], quest_type_icon: q[1],
                    quest_step_icon: `./icons/third_layer/Step${index}Icon.png`, bg_color: q[4] });
                }
                return quest_steps;
            });
            return quest_starters;
        });

        map_markers = quest_starters;
        let toggled_markers = this.state.toggled_quests.map(q => {
            return quest_turn_ins.filter(turn_in => turn_in.quest.id === q.id)
            .concat(quest_steps.filter(step => step.quest.id === q.id))
        })
        toggled_markers.map(markers => {
            return markers.map(marker => map_markers.push(marker));
        })
        let clustered_markers = [];
        if (map_markers.length !== 0) {
            clustered_markers = map_markers.reduce(function (acc, obj) {
                let key = [obj.npc['npc_location_x'], obj.npc['npc_location_y']];
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            });
        }

        delete clustered_markers.bg_color;
        delete clustered_markers.npc;
        delete clustered_markers.quest;
        delete clustered_markers.start_icon;
        delete clustered_markers.active_start_icon;

        let createClusterCustomIcon = (marker_class) => {
            return L.divIcon({
                className: marker_class,
                iconSize: L.point(40, 40, true),
              });
        }

        return (    
            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '825px', width: '100%'}} >
                    <ImageOverlay url={`./icons/CentralShroud2k.jpg`} bounds={this.props.bounds} opacity={1} />
                    {Object.entries(clustered_markers).map(([key, value]) => {
                        if (value.length > 1) {
                            let custom_marker = '';
                            let toggled_quests = [];
                            value.map(v => {
                                if (this.state.toggled_quests.includes(v.quest)) {
                                    toggled_quests.push(v.quest);
                                }
                            })
                            if (toggled_quests.length > 0) {
                                custom_marker = 'customMarkerActive';
                            } else {
                                custom_marker = 'customMarker';
                            }
                            return <MarkerClusterGroup iconCreateFunction={() => createClusterCustomIcon(custom_marker)} >
                                {value.map(marker => {
                                    let icon = null;
                                    let start = null;
                                    if (this.state.toggled_quests.includes(marker.quest)) {
                                        start = marker.active_start_icon;
                                    } else {
                                        start = marker.start_icon;
                                    }
                                    if (marker.start_icon) {
                                        icon = new L.Icon  ({
                                            iconUrl: start,
                                            shadowUrl: marker.bg_color,
                                            shadowSize: [45, 45],
                                            iconSize: [45, 45],
                                        });
                                    } else if (marker.turn_in_icon) {
                                        icon = new L.Icon  ({
                                            iconUrl: marker.turn_in_icon,
                                            shadowUrl: marker.bg_color,
                                            shadowSize: [45, 45],
                                            iconSize: [45, 45],
                                        });
                                    } else {
                                        icon = new L.Icon  ({
                                            iconUrl: marker.quest_step_icon,
                                            shadowUrl: marker.bg_color,
                                            shadowSize: [45, 45],
                                            iconSize: [45, 45],
                                        });
                                    }
                                    
                                    return <Marker key={Math.random()} 
                                    position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                    icon={icon} eventHandlers={{ click: () => this.toggleQuest(marker, 
                                        active_in_zone_quests) }} >
                                        <Tooltip>
                                            <h6 className='text-center'>{marker.quest.quest_name}</h6>
                                            <h6 className='text-center'>{marker.npc.npc_name}</h6>
                                        </Tooltip>
                                    </Marker>
                                })}
                            </MarkerClusterGroup>
                        } else {
                            let icon = null;
                            let color_icon = new L.Icon  ({iconUrl: value[0].bg_color, iconSize: [45, 45]});
                            let step_icon = null;
                            if (value[0].start_icon) {
                                let start = null;
                                    if (this.state.toggled_quests.includes(value[0].quest)) {
                                        start = value[0].active_start_icon;
                                    } else {
                                        start = value[0].start_icon;
                                    }
                                icon = new L.Icon  ({iconUrl: start, iconSize: [45, 45]});
                                return <LayerGroup>
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={color_icon} />
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={icon} eventHandlers={{ click: () => this.toggleQuest(value[0], 
                                        active_in_zone_quests) }} >
                                        <Tooltip>
                                            <h6 className='text-center'>{value[0].quest.quest_name}</h6>
                                            <h6 className='text-center'>{value[0].npc.npc_name}</h6>
                                        </Tooltip>
                                    </Marker>
                                </LayerGroup>
                            } else if (value[0].turn_in_icon) {
                                icon = new L.Icon  ({iconUrl: value[0].turn_in_icon, iconSize: [45, 45]});
                                return <LayerGroup>
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={color_icon} />
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={icon} eventHandlers={{ click: () => this.toggleQuest(value[0], 
                                        active_in_zone_quests) }} >
                                        <Tooltip>
                                            <h6 className='text-center'>{value[0].quest.quest_name}</h6>
                                            <h6 className='text-center'>{value[0].npc.npc_name}</h6>
                                        </Tooltip>
                                    </Marker>
                                </LayerGroup>
                            } else {
                                icon = new L.Icon  ({iconUrl: value[0].quest_type_icon, iconSize: [45, 45]});
                                step_icon = new L.Icon  ({iconUrl: value[0].quest_step_icon, iconSize: [45, 45]});
                                let container_icon = new L.Icon ({iconUrl: './icons/first_layer/IconContainer.png', iconSize: [45, 45]})
                                return <LayerGroup>
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={color_icon} />
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={container_icon} />
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={icon} />
                                    <Marker key={Math.random()} 
                                    position={this.props.revertLat(value[0].npc.npc_location_x, value[0].npc.npc_location_y)} 
                                    icon={step_icon} eventHandlers={{ click: () => this.toggleQuest(value[0], 
                                        active_in_zone_quests) }} >
                                        <Tooltip>
                                            <h6 className='text-center'>{value[0].quest.quest_name}</h6>
                                            <h6 className='text-center'>{value[0].npc.npc_name}</h6>
                                        </Tooltip>
                                    </Marker>
                                </LayerGroup>
                            }
                        }
                    })}
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
                                return <Container key={quest.quest_name}>
                                    <Row>
                                        <Col>
                                            <Button size='sm' key={quest.quest_name} id='toggle-check' className={theme} 
                                            type='checkbox' onClick={() => this.toggleQuest(quest[0], 
                                            active_in_zone_quests.map(q => q[0]))}>
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

export default connect(mapStateToProps)(ZoneMapCont);