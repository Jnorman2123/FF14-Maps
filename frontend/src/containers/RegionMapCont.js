import React, { Component } from 'react';
import { Polygon } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import RegionMapComponent from '../components/RegionMapComponent';

class RegionMapCont extends Component {
    constructor() {
        super();
        this.state = {
            markers:
            [{icon: new L.Icon({iconUrl: `./icons/RegionKey.png`, iconSize: [195, 288]}),
                position: [-33.5, 6.5]
            }],
            zoneMarkers: 
            [
                {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectZoneName.png`, iconSize: [143, 38.5]}),
                position: [-27.95, 6.6]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-31.4, 9.4]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-34.15, 9.4]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-36.9, 9.4]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-39.65, 9.4]
                }
            ],
            highlightedMaps: [],
            popupMarkers: [],
            navigate: false,
            navigateLink: '',
        };
    };

    addMarker = (pos, icon, type) => {
        let marker = {icon: icon, position: pos};
        if (type === 'highlighted') {
            this.setState({ highlightedMaps: [...this.state.highlightedMaps, marker]})
        } else if (type === 'popup') {
            this.setState({ popupMarkers: [...this.state.popupMarkers, marker]})
        } else {
            this.setState({ zoneMarkers: [...this.state.zoneMarkers, marker]})
        }
    };

    removeMarker = (type) => {
        if (type === 'highlighted') {
            this.setState({highlightedMaps: []});
        } else if (type === 'popup') {
            this.setState({popupMarkers: []});
        } else {
            this.setState({zoneMarkers: []});
        }
        
    };

    resetZoneMarkers = () => {
        this.setState({zoneMarkers: 
            [
                {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectZoneName.png`, iconSize: [143, 38.5]}),
                position: [-27.95, 6.6]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-31.4, 9.4]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-34.15, 9.4]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-36.9, 9.4]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-39.65, 9.4]
                }
            ]
        });
    }

    render () {
        let mapName = this.props.mapName.split(' ').join('');
        let active_in_zone_quests = [];
        let active_in_zone_hunting_log_quests = [];
        let active_in_zone_main_quests = [];
        let active_in_zone_side_quests = [];
        let active_in_zone_class_quests = [];

        let setActiveInZoneQuests = (zone_name) => {
            active_in_zone_quests = [];
            active_in_zone_hunting_log_quests = [];
            active_in_zone_main_quests = [];
            active_in_zone_side_quests = [];
            active_in_zone_class_quests = [];
            this.props.npcs.npcs.map(npc => {
                if (npc.npc_zone.includes(zone_name)) {
                    this.props.active_quests.map(q => {
                        if (q.quest_npcs[0] === npc.id && !active_in_zone_quests.includes(q)) {
                            active_in_zone_quests.push(q)
                        };
                        return active_in_zone_quests;
                    });
                };
                return active_in_zone_quests;
            });
            active_in_zone_quests.map(q => {
                if (q.quest_type === 'Main Story' && !active_in_zone_main_quests.includes(q)) {
                    active_in_zone_main_quests.push(q);
                } else if (q.quest_type === 'Side' && !active_in_zone_side_quests.includes(q)) {
                    active_in_zone_side_quests.push(q);
                } else if (q.quest_type === 'Class' && !active_in_zone_class_quests.includes(q)) {
                    active_in_zone_class_quests.push(q);
                } else if (q.quest_type === 'Hunting Log' && !active_in_zone_hunting_log_quests.includes(q)) {
                    active_in_zone_hunting_log_quests.push(q);
                }
                return null;
            });
            return null;
        };

        let purpleOptions = { color: 'tan'};
        let iconSize = [780.78, 778.44];
        let iconPos = [21.45, -21.45]; 

        let createPolygon = (polygon, name, popupPos, popupNamePos) => {
            let revertedPolygon = polygon.map(pos => {
                return this.props.revertLat(pos[0], pos[1])
            })
            return <Polygon key={name} positions={revertedPolygon} pathOptions={purpleOptions}  opacity={.01} eventHandlers={{
                mouseover: () => {
                    this.removeMarker('zone');
                    this.removeMarker('highlighted');
                    this.removeMarker('popup');
                    let zone_name_icon = name.split(' ').join('');
                    setActiveInZoneQuests(name);
                    let zoneIcon = new L.Icon({iconUrl: `./icons/zone_names/${zone_name_icon}ZoneName.png`,
                        iconSize: [143, 38.5]})
                    let sideQuestNumber = new L.Icon({iconUrl: `./icons/quest_numbers/${active_in_zone_side_quests.length}.png`,
                        iconSize: [33.5, 33.5]});
                    let mainQuestNumber = new L.Icon({iconUrl: `./icons/quest_numbers/${active_in_zone_main_quests.length}.png`,
                        iconSize: [33.5, 33.5]});
                    let classQuestNumber = new L.Icon({iconUrl: `./icons/quest_numbers/${active_in_zone_class_quests.length}.png`,
                        iconSize: [33.5, 33.5]});
                    let huntingQuestNumber = new L.Icon({iconUrl: `./icons/quest_numbers/${active_in_zone_hunting_log_quests.length}.png`,
                        iconSize: [33.5, 33.5]});
                    let zonePopup = new L.Icon({iconUrl: `./icons/zone_names/PopupContainer.png`,
                        iconSize: [182, 112]});
                    let highlightedZone = new L.Icon({iconUrl: `/region_zones/${zone_name_icon}Highlighted.png`,
                        iconSize: iconSize});
                    this.addMarker([-27.95, 6.6], zoneIcon, 'zone');
                    this.addMarker([-31.4, 9.4], classQuestNumber, 'zone');
                    this.addMarker([-34.15, 9.4], mainQuestNumber, 'zone');
                    this.addMarker([-36.9, 9.4], huntingQuestNumber, 'zone');
                    this.addMarker([-39.65, 9.4], sideQuestNumber, 'zone');
                    this.addMarker([-popupPos[0], -popupPos[1]], zonePopup, 'popup');
                    this.addMarker([-popupNamePos[0], -popupNamePos[1]], zoneIcon, 'zone');
                    this.addMarker([-iconPos[0], -iconPos[1]], highlightedZone, 'highlighted');
                }, click: () => {
                    this.setState({ navigate: true });
                    this.setState({ navigateLink: `/${name.split(' ').join('').toLowerCase()}` });
                }, mouseout: () => {
                    this.resetZoneMarkers();
                    this.removeMarker('popup');
                    this.removeMarker('highlighted');
                }
            }}>
            </Polygon>
        }

        let polygonCollection = [];
        if (this.props.mapName === 'La Noscea') {
            polygonCollection = this.props.zone_attributes[0];
        } else if (this.props.mapName === 'The Black Shroud') {
            polygonCollection = this.props.zone_attributes[1];
        } else {
            polygonCollection = this.props.zone_attributes[2];
        };

        return (
            <Container>
                <RegionMapComponent center={this.props.center} zoom={this.props.zoom} 
                bounds={this.props.bounds} polygonCollection={polygonCollection} mapName={mapName} 
                props={this.state} createPolygon={createPolygon} />
                {/* <MapContainer crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                    minZoom={this.props.zoom} maxZoom={this.props.zoom} maxBounds={this.props.bounds} 
                    maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '100%'}}>
                    <ImageOverlay url={`./maps/${mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    {polygonCollection.map(zone => {
                        return createPolygon(zone.polygon, zone.name, zone.popupPos, zone.popupNamePos);
                    })}
                    <LayerGroup>
                        {this.state.markers.map(mar => {
                            return <Marker key={Math.random()} position={mar.position} icon={mar.icon} zIndexOffset={250} />
                        })};
                        {this.state.highlightedMaps.map(map => {
                            return <Marker key={Math.random()} position={map.position} icon={map.icon} interactive={false} 
                            zIndexOffset={0} />
                        })};
                        {this.state.popupMarkers.map(mar => {
                            return <Marker key={Math.random()} position={mar.position} icon={mar.icon} zIndexOffset={500} />
                        })};
                        {this.state.zoneMarkers.map(mar => {
                            return <Marker key={Math.random()} position={mar.position} icon={mar.icon} zIndexOffset={1000} />
                        })};
                    </LayerGroup>
                    {this.state.navigate && <Navigate to={this.state.navigateLink} replace={true} />}
                </MapContainer> */}
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    zone_attributes: storeData.storeData.zone_attributes
})

export default connect(mapStateToProps)(RegionMapCont);