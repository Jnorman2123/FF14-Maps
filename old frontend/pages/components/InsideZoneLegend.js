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

    if (zoomLevel === 5.3) {
        return <>
            <Marker key={'zone legend'} position={[-18.65, 4.55]} icon={props.props.legend_icon} />
            <Marker key={'back button'} position={[-20, 20]} icon={props.props.back_button_icon} eventHandlers={{
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