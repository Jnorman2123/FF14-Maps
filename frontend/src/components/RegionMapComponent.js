import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { Navigate } from 'react-router-dom';

class RegionMapComponent extends Component {
    render() {
        let zone_marker = null;
        if (this.props.mapName === 'LaNoscea') {
            zone_marker = this.props.props.la_noscea_zone_marker;
        } else if (this.props.mapName === 'TheBlackShroud') {
            zone_marker = this.props.props.the_black_shroud_zone_marker;
        } else {
            zone_marker = this.props.props.thanalan_zone_marker;
        }

        return (
            <MapContainer crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.zoom} maxZoom={this.props.zoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={false} style={{height: '800px', width: '100%'}}>
                <ImageOverlay url={`./maps/${this.props.mapName}.jpg`} bounds={this.props.bounds} opacity={1} />
                {this.props.zone_legend_icons.map(legend_icons => {
                    return legend_icons.map(marker => {
                        return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                        zIndexOffset={marker.z_offset} />
                    })
                })};
                {this.props.hover_overlays.map(overlay => overlay)};
                <Marker key={Math.random()} icon={zone_marker.icon} position={zone_marker.position} zIndexOffset={1000}/>
                {this.props.props.navigate && <Navigate to={this.props.props.navigateLink} replace={true} />}
            </MapContainer>
        )
    }
}

export default RegionMapComponent;