import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { Navigate } from 'react-router-dom';

class WorldMapComponent extends Component {
    render() {
        let zone_marker = this.props.props.zone_marker;
        console.log(this.props.la_noscea_legend_icons)
        return (
            <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false} maxZoom={this.props.zoom}
                minZoom={this.props.zoom} style={{height: '800px', width: '100%'}} >
                {this.props.la_noscea};
                {this.props.thanalan};
                {this.props.the_black_shroud};
                <ImageOverlay url={`./maps/${this.props.mapName}.jpg`} bounds={this.props.bounds} opacity={1} />
                {this.props.la_noscea_legend_icons.map(marker => {
                    return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                    zIndexOffset={marker.z_offset}/>
                })};
                {this.props.thanalan_legend_icons.map(marker => {
                    return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                    zIndexOffset={marker.z_offset}/>
                })};
                {this.props.the_black_shroud_legend_icons.map(marker => {
                    return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                    zIndexOffset={marker.z_offset}/>
                })};
                <Marker key={Math.random()} icon={zone_marker.icon} position={zone_marker.position} zIndexOffset={1000}/>
                {this.props.props.highlighted_markers.map(mar => {
                    return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={0} 
                    opacity={1} interactive={false} />
                })};
                {this.props.props.navigate && <Navigate to={this.props.props.navigate_link} replace={true} />}
            </MapContainer>
        )
    }
}

export default WorldMapComponent;