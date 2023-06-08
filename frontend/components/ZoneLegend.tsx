import React, { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getOutsideZoneNamesState } from '@/store/slices/dataStoreSlice';

export default function ZoneLegend() {
    const [zoomLevel, setZoomLevel] = useState<number>(4.25);
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter();
    const { asPath } = router;
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let spacedZoneName: string = splitPathName.split(/(?=[A-Z])/).join(' ');
    let outsideZoneNames: string[] = useSelector(getOutsideZoneNamesState);
    let legendIcon = new L.Icon ({iconUrl: `/icons/ZoneLegend.png`, iconSize: [280, 209]});
    let backButtonIcon = new L.Icon ({iconUrl: `/icons/nav_icons/BackButton.png`, iconSize: [64, 64]});
    let legendIconPosistion: any;
    let backButtonIconPosition: any;

    if (asPath.split('/')[1] === 'quest') {
        spacedZoneName = splitPathName.split('+')[0].split(/(?=[A-Z])/).join(' ');
    } else {
        spacedZoneName = splitPathName.split(/(?=[A-Z])/).join(' '); 
    }

    if (outsideZoneNames.includes(spacedZoneName)) {
        legendIconPosistion = L.latLng([-36.25, 8.4]) ;
        backButtonIconPosition = L.latLng([-39, 39]);
    } else {
        legendIconPosistion = L.latLng([-18.65, 4.55]);
        backButtonIconPosition = L.latLng([-20, 20]);
    }
    
    if (hovered) {
        backButtonIcon = new L.Icon ({iconUrl: `/icons/nav_icons/BackButtonHover.png`, iconSize: [64, 64]});
    }
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    if (zoomLevel === 4.25) {
        return <>
            <Marker key={'zone legend'} position={legendIconPosistion} icon={legendIcon} />
            <Marker key={'back button'} position={backButtonIconPosition} icon={backButtonIcon} eventHandlers={{
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
    } else {
        return null;
    }
}