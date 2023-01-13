import React from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import ZoneLegend from './ZoneLegend';



function ZoneMapComponent(props) {
    
    return (    
        <MapContainer crs={L.CRS.Simple} center={props.center} zoom={props.zoom} 
        minZoom={props.minZoom} maxZoom={props.maxZoom} maxBounds={props.bounds} 
        maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '825px', width: '100%'}} 
        className='bg-lightbg'>
            <ImageOverlay url={`./maps/${props.mapName}.jpg`} bounds={props.bounds} opacity={1} 
            attribution='@ 2010-2023 SQUARE ENIX CO., LTD. All Rights Reserved'/>
            {props.renderMarkers(props.unclustered_markers)}
            <ZoneLegend props={props} />
        </MapContainer>
    );
}

export default ZoneMapComponent;