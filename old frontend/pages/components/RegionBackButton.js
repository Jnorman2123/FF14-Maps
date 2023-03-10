import React from 'react';
import { Marker } from 'react-leaflet';
import { useNavigate } from 'react-use-navigate';
import L from 'leaflet';

function RegionBackButton(props) {
    let back_button_icon = new L.Icon({iconUrl: `./icons/nav_icons/BackButton.png`, iconSize: [64, 64]});

    if (props.hovered) {
        back_button_icon = new L.Icon({iconUrl: `./icons/nav_icons/BackButtonHover.png`, iconSize: [64, 64]});
    }
    
    let nav = useNavigate();
    return <Marker key={'back button'} position={[-39, 39]} icon={back_button_icon} eventHandlers={{
        click: () => {
            nav(-1);
        },
        mouseover: () => {
            props.setHovered(true);
        },
        mouseout: () => {
            props.setHovered(false);
        },
    }} />

}

export default RegionBackButton;