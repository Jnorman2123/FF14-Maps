import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { Navigate } from 'react-router-dom';

class RegionMapComponent extends Component {
    render() {
        return (
            <MapContainer crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.zoom} maxZoom={this.props.zoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '100%'}}>
                <ImageOverlay url={`./maps/${this.props.mapName}.jpg`} bounds={this.props.bounds} opacity={1} />
                {this.props.polygonCollection.map(zone => {
                    return this.props.createPolygon(zone.polygon, zone.name, zone.popupPos, zone.popupNamePos);
                })}
                <LayerGroup>
                    {this.props.props.markers.map(mar => {
                        return <Marker key={Math.random()} position={mar.position} icon={mar.icon} zIndexOffset={250} />
                    })};
                    {this.props.props.highlightedMaps.map(map => {
                        return <Marker key={Math.random()} position={map.position} icon={map.icon} interactive={false} 
                        zIndexOffset={0} />
                    })};
                    {this.props.props.popupMarkers.map(mar => {
                        return <Marker key={Math.random()} position={mar.position} icon={mar.icon} zIndexOffset={500} />
                    })};
                    {this.props.props.zoneMarkers.map(mar => {
                        return <Marker key={Math.random()} position={mar.position} icon={mar.icon} zIndexOffset={1000} />
                    })};
                </LayerGroup>
                {this.props.props.navigate && <Navigate to={this.props.props.navigateLink} replace={true} />}
            </MapContainer>
        )
    }
}

export default RegionMapComponent;