import React from 'react';
import { Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

function RegionBackButton() {
    let back_button_icon = new L.Icon ({iconUrl: `./icons/BackButton.png`, iconSize: [64, 64]});
    
    let nav = useNavigate();
    return <Marker key={'back button'} position={[-39, 39]} icon={back_button_icon} eventHandlers={{
        click: () => {
            nav(-1);
        }
    }} />

}

export default RegionBackButton;