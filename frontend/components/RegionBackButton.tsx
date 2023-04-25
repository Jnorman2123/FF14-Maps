import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useRouter } from 'next/router';

const RegionBackButton = () => {
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter();
    let backButtonIcon = new L.Icon ({iconUrl: `/icons/nav_icons/BackButton.png`, iconSize: [64, 64]});
    
    if (hovered) {
        backButtonIcon = new L.Icon ({iconUrl: `/icons/nav_icons/BackButtonHover.png`, iconSize: [64, 64]});
    }
    return <>
        <Marker key={'back button'} position={[-39, 39]} icon={backButtonIcon} eventHandlers={{
            click: () => {
                router.back();
            },
            mouseover: () => {
                setHovered(true);
            },
            mouseout: () => {
                setHovered(false);
            },
        }}/>
    </>
}

export default RegionBackButton;