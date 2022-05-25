import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay, Polygon, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import { Navigate } from 'react-router-dom';

class WorldMapCont extends Component {
    render () {
        return (
            <div>
                <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false}
                style={{height: '800px', width: '900px'}} >
                    <ImageOverlay url={`./maps/World.png`} bounds={this.props.bounds} opacity={1} />
                </MapContainer>
            </div>
        )
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(WorldMapCont);