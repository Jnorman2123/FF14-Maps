import React, { useState } from 'react';
import { MapContainer, ImageOverlay, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

function ZoneLegend(props) {
    const [zoomLevel, setZoomLevel] = useState(props.props.zoom);
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    if (zoomLevel === 5.3) {
        return <Marker key={'zone legend'} position={[-18.65, 4.55]} icon={props.props.legend_icon} />
    } else {
        return null;
    }
}

function InsideZoneMapComponent(props) {
    
    return (    
        <MapContainer crs={L.CRS.Simple} center={props.center} zoom={props.zoom} 
        minZoom={props.minZoom} maxZoom={props.maxZoom} maxBounds={props.bounds} 
        maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '825px', width: '100%'}} >
            <ImageOverlay url={`./maps/${props.mapName}.jpg`} bounds={props.bounds} opacity={1} />
            {props.renderMarkers(props.unclustered_markers)}
            <ZoneLegend props={props} />
        </MapContainer>
    );
}

export default InsideZoneMapComponent;