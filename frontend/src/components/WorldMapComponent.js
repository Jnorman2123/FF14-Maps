import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';

class WorldMapComponent extends Component {
    render() {
        let zone_marker = this.props.props[0];
        return (
            <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false} maxZoom={this.props.zoom}
                minZoom={this.props.zoom} style={{height: '825px', width: '100%'}} className='bg-lightbg'>
                
                <ImageOverlay url={`./maps/${this.props.mapName}.jpg`} bounds={this.props.bounds} opacity={1} />
                {this.props.la_noscea_legend_icons.map(marker => {
                    return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                    zIndexOffset={marker.z_offset} />
                })}
                {this.props.thanalan_legend_icons.map(marker => {
                    return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                    zIndexOffset={marker.z_offset} />
                })}
                {this.props.the_black_shroud_legend_icons.map(marker => {
                    return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                    zIndexOffset={marker.z_offset} />
                })}
                {this.props.hover_overlays.map(overlay => overlay)}
                <Marker key={Math.random()} icon={zone_marker.icon} position={zone_marker.position} zIndexOffset={1000}/>
                {this.props.props[1].map(mar => {
                    return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={0} 
                    opacity={1} interactive={false} />
                })}
            </MapContainer>
        )
    }
}

export default WorldMapComponent;