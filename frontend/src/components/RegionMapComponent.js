import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { Navigate } from 'react-router-dom';
import RegionBackButton from './RegionBackButton';

class RegionMapComponent extends Component {
    render() {
        let zone_marker = null;
        let hover_overlays = [];

        if (this.props.mapName === 'LaNoscea') {
            zone_marker = this.props.props[0];
        } else if (this.props.mapName === 'TheBlackShroud') {
            zone_marker = this.props.props[1];
        } else {
            zone_marker = this.props.props[2];
        }

        return (
            <MapContainer crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.zoom} maxZoom={this.props.zoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={false} style={{height: '800px', width: '100%'}}>
                <ImageOverlay url={`./maps/${this.props.mapName}.jpg`} bounds={this.props.bounds} opacity={1} 
                attribution='@ 2010-2013 SQUARE ENIX CO., LTD. All Rights Reserved'/>
                {this.props.legend_icon_groups.map(group => {
                    return Object.entries(group).map(([key, value]) => {
                        if (key !== 'hover_overlay') {
                            return <Marker key={Math.random()} icon={value.icon} position={value.position} 
                                zIndexOffset={value.z_offset} />
                        } else {
                            return value;
                        }
                    })
                })};
                {hover_overlays.map(overlay => overlay)};
                {this.props.props[3].map(marker => {
                    return <Marker key={Math.random()} icon={marker.icon} position={marker.position} 
                    zIndexOffset={50}/>
                })}
                <Marker key={Math.random()} icon={zone_marker.icon} position={zone_marker.position} zIndexOffset={1000}/>
                {this.props.props.navigate && <Navigate to={this.props.props.navigate_link} replace={true} />}
                <RegionBackButton />
            </MapContainer>
        )
    }
}

export default RegionMapComponent;