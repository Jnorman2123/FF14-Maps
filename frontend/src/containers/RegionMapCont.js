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
        let quest_count_icon_size = [33.5, 33.5];
        
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
                    let main_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.main_starters, name)}.png`, quest_count_icon_size);
                    let side_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.side_starters, name)}.png`, quest_count_icon_size);
                    let hunting_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.hunting_starters, name)}.png`, quest_count_icon_size);
                    let class_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.class_starters, name)}.png`, quest_count_icon_size);
                    let zoneIcon = new L.Icon({iconUrl: `./icons/zone_names/${zone_name_icon}ZoneName.png`,
                        iconSize: [143, 38.5]})
                    let zonePopup = new L.Icon({iconUrl: `./icons/zone_names/PopupContainer.png`,
                        iconSize: [182, 112]});
                    let highlightedZone = new L.Icon({iconUrl: `/region_zones/${zone_name_icon}Highlighted.png`,
                        iconSize: iconSize});
                    this.addMarker([-27.95, 6.6], zoneIcon, 'zone');
                    this.addMarker([-31.4, 9.4], class_quest_count_icon, 'zone');
                    this.addMarker([-34.15, 9.4], main_quest_count_icon, 'zone');
                    this.addMarker([-36.9, 9.4], hunting_quest_count_icon, 'zone');
                    this.addMarker([-39.65, 9.4], side_quest_count_icon, 'zone');
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
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    zone_attributes: storeData.storeData.zone_attributes
})

export default connect(mapStateToProps)(RegionMapCont);