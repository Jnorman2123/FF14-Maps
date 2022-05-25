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
        }
    }


    render () {
        return (
            <Container>
                <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false} maxZoom={this.props.zoom}
                minZoom={this.props.zoom} style={{height: '800px', width: '900px'}} >
                    <ImageOverlay url={`./maps/${this.props.mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    {this.state.keyMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} 
                        position={mar.position} />
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