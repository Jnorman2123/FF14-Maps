import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay, LayerGroup, Tooltip } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
import { connect } from 'react-redux';
import '../App.css';

class ZoneMapCont extends Component {

    render() {
        let mapName = this.props.mapName.split(' ').join('');
        let map_markers = [];
        let npcs = this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName));
        let npc_ids = npcs.map(n => n.id);
        let i = 0;
        let active_quest_marker_data = [];
        let in_zone_quests = [];

        this.props.active_quests.concat(this.props.toggled_quests).map(q => {
            q.quest_npcs.map(npc => {
                if (npc_ids.includes(npc) && !in_zone_quests.includes(q)) {
                    in_zone_quests.push(q);
                }
                return in_zone_quests;
            })
            return in_zone_quests;
        })

        in_zone_quests.map(aq => {
            let quest_type_icon = '';
            let start_icon = '';
            let turn_in_icon = '';
            let active_start_icon = '';
            let quest_type = '';
            i++;
            let bg_color = `./icons/second_layer/BgColor${i}.png`;

            if (aq.quest_type === 'Main Story') {
                quest_type = 'MainStory';
            } else if (aq.quest_type === 'Class') {
                quest_type = 'Class';
            } else if (aq.quest_type === 'Side') {
                quest_type = 'Side';
            } else {
                quest_type = 'HuntingLog';
            } 
            quest_type_icon = `./icons/fourth_layer/${quest_type}QuestIcon.png`;
            start_icon = `./icons/cluster_icons/${quest_type}StartIcon.png`;
            active_start_icon = `./icons/cluster_icons/${quest_type}StartIconActive.png`;
            turn_in_icon = `./icons/cluster_icons/${quest_type}TurninIcon.png`;
            return active_quest_marker_data.push([aq, quest_type_icon, start_icon, turn_in_icon, bg_color, active_start_icon]);
        })

        active_quest_marker_data.map(q => {
            let index = 0;
            let steps = q[0].quest_npcs.slice(1, -1).map(s => npcs.filter(n => n.id ===s)[0]);
            let starter = npcs.filter(npc => npc.id === q[0].quest_npcs[0]);
            let turn_in = npcs.filter(npc => npc.id === q[0].quest_npcs[q[0].quest_npcs.length -1]);
            if (starter[0] !== undefined) {
                map_markers.push({npc: starter[0], quest: q[0], start_icon: q[2], bg_color: q[4], 
                    active_start_icon: q[5] });
            }
            if (turn_in[0] !== undefined && this.props.toggled_quests.includes(q[0])) {
                map_markers.push({npc: turn_in[0], quest: q[0], turn_in_icon: q[3], bg_color: q[4] });
            }
            steps.map(s => {
                index ++;
                if (s !== undefined && this.props.toggled_quests.includes(q[0])) {
                    map_markers.push({npc: s, quest: q[0], quest_type_icon: q[1],
                    quest_step_icon: `./icons/third_layer/Step${index}Icon.png`, bg_color: q[4] });
                }
                return s;
            })
            return map_markers;
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

        let unclustered_markers = [];
        Object.entries(clustered_markers).map(([key, value]) => {
            if (value.length > 1) {
                let offset = 0;
                value.map(marker => {
                    let new_marker = {};
                    let new_y = parseFloat(marker.npc.npc_location_y);
                    new_y += offset;
                    new_marker = {...marker, npc: {...marker.npc, npc_location_y: new_y.toString()}};
                    unclustered_markers.push(new_marker);
                    offset += 0.2;
                    return unclustered_markers;
                })
            } else {
                unclustered_markers.push(value[0]);
            }
            return unclustered_markers;
        })

        return (    
            <div>
                <MapContainer crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '825px', width: '100%'}} >
                    <ImageOverlay url={`./maps/${mapName}.jpg`} bounds={this.props.bounds} opacity={1} />
                    {unclustered_markers.map(marker => {
                        let icon = null;
                        let color_icon = new L.Icon  ({iconUrl: marker.bg_color, iconSize: [45, 45]});
                        let step_icon = null;
                        if (marker.start_icon) {
                            let start = null;
                                if (this.props.toggled_quests.includes(marker.quest)) {
                                    start = marker.active_start_icon;
                                } else {
                                    start = marker.start_icon;
                                }
                            icon = new L.Icon  ({iconUrl: start, iconSize: [45, 45]});
                            return <LayerGroup >
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={color_icon} />
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={icon} eventHandlers={{ click: () => this.props.toggleQuest(marker, 
                                this.props.active_quests) }} >
                                    <Tooltip>
                                        <h6 className='text-center'>{marker.quest.quest_name}</h6>
                                        <h6 className='text-center'>{marker.npc.npc_name}</h6>
                                    </Tooltip>
                                </Marker>
                            </LayerGroup>
                        } else if (marker.turn_in_icon) {
                            icon = new L.Icon  ({iconUrl: marker.turn_in_icon, iconSize: [45, 45]});
                            return <LayerGroup >
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={color_icon} />
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={icon} eventHandlers={{ click: () => this.props.toggleQuest(marker, 
                                this.props.active_quests) }} >
                                    <Tooltip>
                                        <h6 className='text-center'>{marker.quest.quest_name}</h6>
                                        <h6 className='text-center'>{marker.npc.npc_name}</h6>
                                    </Tooltip>
                                </Marker>
                            </LayerGroup>
                        } else {
                            icon = new L.Icon  ({iconUrl: marker.quest_type_icon, iconSize: [45, 45]});
                            step_icon = new L.Icon  ({iconUrl: marker.quest_step_icon, iconSize: [45, 45]});
                            let container_icon = new L.Icon ({iconUrl: './icons/first_layer/IconContainer.png', iconSize: [45, 45]})
                            return <LayerGroup >
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={color_icon} />
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={container_icon} />
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={icon} />
                                <Marker key={Math.random()} 
                                position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
                                icon={step_icon} eventHandlers={{ click: () => this.props.toggleQuest(marker, 
                                this.props.active_quests) }} >
                                    <Tooltip>
                                        <h6 className='text-center'>{marker.quest.quest_name}</h6>
                                        <h6 className='text-center'>{marker.npc.npc_name}</h6>
                                    </Tooltip>
                                </Marker>
                            </LayerGroup>
                        }
                    })}
                </MapContainer>
            </div>
        );
    }
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
})

export default connect(mapStateToProps)(ZoneMapCont);