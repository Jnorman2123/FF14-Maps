import React, { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';

function ZoneLegend(props) {
    const [zoomLevel, setZoomLevel] = useState(props.props.zoom);
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    if (zoomLevel === 4.25) {
        return <Marker key={'zone legend'} position={[-36.25, 8.4]} icon={props.props.legend_icon} />
    } else {
        return null;
    }
}

export default ZoneLegend;