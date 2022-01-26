import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';

class MapCont extends Component {

    render() {
        const pos1 = this.props.revertLat(11.7, 13.5);
        const pos2 = this.props.revertLat(11.9, 11.8);
        const pos3 = this.props.revertLat(14.5, 12.9);
    
        return (
            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} minZoom={this.props.minZoom}
                maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} maxBoundsViscosity='1' scrollWheelZoom={true}
                style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url='./maps/NewGridania_Base_v3.jpg' bounds={this.props.bounds} opacity={1} />
                    <Marker position={pos3}>
                        <Popup>
                            Archer's Guild Aethernet
                        </Popup>
                    </Marker>
                    <Marker position={pos1}>
                        <Popup>
                            Miounne
                        </Popup>
                    </Marker>
                    <Marker position={pos2}>
                        <Popup>
                            New Gridania Aetheryte
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            
        );
    }
}

export default MapCont;