import React from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import InsideZoneLegend from './InsideZoneLegend';

function InsideZoneMapComponent(props) {
    
    return (    
        <MapContainer crs={L.CRS.Simple} center={props.center} zoom={props.zoom} 
        minZoom={props.minZoom} maxZoom={props.maxZoom} maxBounds={props.bounds} 
        maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '825px', width: '100%'}} >
            <ImageOverlay attribution='@ 2010-2013 SQUARE ENIX CO., LTD. All Rights Reserved' 
            url={`./maps/${props.mapName}.jpg`} bounds={props.bounds} opacity={1} />
            {props.renderMarkers(props.unclustered_markers)}
            <InsideZoneLegend props={props} />
        </MapContainer>
    );
}

export default InsideZoneMapComponent;