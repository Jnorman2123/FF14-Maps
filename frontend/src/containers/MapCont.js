import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L, { LatLngBounds } from 'leaflet';

class MapCont extends Component {

    revertLat = (x,y) => {
        return [-y, x];
      }
    

    render() {

        const bounds = new LatLngBounds(this.revertLat(0, 0), this.revertLat(42, 42));
        const xOffset = (0.4);
        const yOffset = (0.6);
        const pos1 = this.revertLat(23.5 - xOffset, 14.0 - yOffset);
        const pos2 = this.revertLat(23.8 - xOffset, 14.3 - yOffset);

        return (
            <div className='text-center'>
                <MapContainer crs={L.CRS.Simple} center={[-21, 21]} zoom={4} minZoom={4} maxZoom={6} maxBounds={bounds}
                 maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '935px'}}>
              <ImageOverlay url='./maps/CentralShroud.png' bounds={bounds} opacity={1} />
              <Marker position={this.revertLat(42, 42)}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <Marker position={pos1}>
                <Popup>
                  Lv. 19 Waking The Spirit
                </Popup>
              </Marker>
              <Marker position={pos2}>
                <Popup>
                  Lv. 19 Marvelously Mutable Materia
                </Popup>
              </Marker>
            </MapContainer>
            </div>
            
        );
    }
}

export default MapCont;