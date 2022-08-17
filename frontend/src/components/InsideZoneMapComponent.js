import React, { Component } from 'react';
import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import L from 'leaflet';

class InsideZoneMapComponent extends Component {

    render() {
        return (    
            <MapContainer crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
            minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
            maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '825px', width: '100%'}} >
                <ImageOverlay url={`./maps/${this.props.mapName}.jpg`} bounds={this.props.bounds} opacity={1} />
                {this.props.renderMarkers(this.props.unclustered_markers)}
                <Marker key={'zone legend'} position={[-18.65, 4.55]} icon={this.props.legend_icon} />
            </MapContainer>
        );
    }
}

export default InsideZoneMapComponent;