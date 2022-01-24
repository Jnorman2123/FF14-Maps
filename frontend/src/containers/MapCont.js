import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L, { LatLngBounds } from 'leaflet';

class MapCont extends Component {

    revertLat = (x,y) => {
        return [-y, x];
      }
    

    render() {

        const bounds = new LatLngBounds(this.revertLat(1, 1), this.revertLat(21.5, 21.5));
        const xOffset = (-0.04);
        const yOffset = (-0.1);
        const pos1 = this.revertLat(11.7 - xOffset, 13.5 - yOffset);
        const pos2 = this.revertLat(11.9 - xOffset, 11.8 - yOffset);
        const pos3 = this.revertLat(14.5 - xOffset, 12.9 - yOffset);

        return (
            <div className='text-center'>
                <MapContainer crs={L.CRS.Simple} center={[-12, 12]} zoom={4} minZoom={5} maxZoom={7} maxBounds={bounds}
                 maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '935px'}}>
              <ImageOverlay url='./maps/NewGridaniaPlaceholder.png' bounds={bounds} opacity={1} />
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