import React, { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';

function ZoneLegend(props) {
    const [zoomLevel, setZoomLevel] = useState(props.props.zoom);
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    if (zoomLevel === 5.3) {
        return <>
            <Marker key={'zone legend'} position={[-18.65, 4.55]} icon={props.props.legend_icon} />
            <Marker key={'back button'} position={[-2.5, 2.5]} icon={props.props.back_button_icon} />
        </>
    } else {
        return null;
    }
}

export default ZoneLegend;