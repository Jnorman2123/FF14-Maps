import React, { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-use-navigate';

function ZoneLegend(props) {
    const [zoomLevel, setZoomLevel] = useState(props.props.zoom);
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    let nav = useNavigate();

    if (zoomLevel === 4.25) {
        return <>
            <Marker key={'zone legend'} position={[-36.25, 8.4]} icon={props.props.legend_icon} />
            <Marker key={'back button'} position={[-39, 39]} icon={props.props.back_button_icon} eventHandlers={{
                click: () => {
                    nav(-1);
                },
                mouseover: () => {
                    props.props.setHovered(true);
                },
                mouseout: () => {
                    props.props.setHovered(false);
                },
            }}/>
        </>
    } else {
        return null;
    }
}

export default ZoneLegend;