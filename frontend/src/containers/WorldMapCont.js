import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay, Polygon, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import { Navigate } from 'react-router-dom';

class WorldMapCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyMarkers: [
                {icon: new L.Icon({
                    iconUrl: `./icons/RegionKey.png`,
                    iconRetinaUrl: `./icons/RegionKey.png`,
                    popupAnchor: [0, 0],
                    iconSize: [195, 288],
                    }),
                    position: [-34, 36.25]
                }
            ],
            zoneMarkers: 
            [
                {icon: new L.Icon({
                    iconUrl: `./icons/zone_names/SelectZoneName.png`,
                    iconRetinaUrl: `./icons/zone_names/SelectZoneName.png`,
                    popupAnchor: [0, 0],
                    iconSize: [143, 38.5],
                }),
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-40.15, 39.1]
                }
            ],
        }
    };


    render () {

        return (
            <Container>
                <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false} maxZoom={this.props.zoom}
                minZoom={this.props.zoom} style={{height: '800px', width: '900px'}} >
                    <ImageOverlay url={`./maps/${this.props.mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    {this.state.keyMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={250}/>
                    })}
                    {this.state.zoneMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={500}/>
                    })}
                </MapContainer>
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(WorldMapCont);