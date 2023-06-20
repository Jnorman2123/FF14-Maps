import { MapContainer, Marker, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getHoverOverlayDetailsState, getLegendDetailsState } from '@/store/slices/dataStoreSlice';
import type { TypeHoverOverlay, TypeLegend } from '@/types';
import RegionBackButton from './RegionBackButton';

type RegionMapProps = {
    zoneNameMarker: {
        iconUrl: string;
        iconSize: number[];
        iconPosition: number[];
    };
}

export default function RegionMap({ zoneNameMarker }: RegionMapProps) {
    const [zoneMarker, setZoneMarker] = useState({icon: new L.Icon({iconUrl: zoneNameMarker.iconUrl, 
        iconSize: [zoneNameMarker.iconSize[0], zoneNameMarker.iconSize[1]]}), 
        position: [zoneNameMarker.iconPosition[0], zoneNameMarker.iconPosition[1]]});
    const [highlightedMarkers, setHighlightedMarkers] = useState<any[]>([]);
    const router = useRouter();
    const { asPath } = router;
    let splitPathName = asPath.split('/').slice(-1)[0];
    let regionName = splitPathName.split(/(?=[A-Z])/).join('');
    let hoverOverlayDetails: TypeHoverOverlay[] = useSelector(getHoverOverlayDetailsState);
    let legendDetails: TypeLegend[] = useSelector(getLegendDetailsState);
    let markers: any[] = [];

    useEffect(() => {
        resetZoneMarker();
        removeMarker();
    }, [splitPathName])

    const addMarker = ((pos: number[], icon: any) => {
        let marker = {icon: icon, position: pos};
        setHighlightedMarkers([...highlightedMarkers, marker]);
    });

    const removeMarker = () => {
        setHighlightedMarkers([]);
    };

    const setNewZoneMarker = ((zoneIcon: string) => {
        setZoneMarker({icon: new L.Icon({iconUrl: zoneIcon, iconSize: [zoneNameMarker.iconSize[0], zoneNameMarker.iconSize[1]]}),
        position: [zoneNameMarker.iconPosition[0], zoneNameMarker.iconPosition[1]]});
    })

    const resetZoneMarker = () => {
        setZoneMarker({icon: new L.Icon({iconUrl: zoneNameMarker.iconUrl,
        iconSize: [zoneNameMarker.iconSize[0], zoneNameMarker.iconSize[1]]}), 
        position: [zoneNameMarker.iconPosition[0], zoneNameMarker.iconPosition[1]]});
    }

    const createLegendIcons = ((legendDetails: TypeLegend[]) => {
        legendDetails.map((legendDetailObject: TypeLegend) => {
            let legendMarker = {
                icon: new L.Icon({iconUrl: legendDetailObject.legendIcon.legendIconUrl, 
                iconSize: [legendDetailObject.legendIcon.legendIconSize[0], legendDetailObject.legendIcon.legendIconSize[1]]}),
                position: [legendDetailObject.legendIcon.legendIconPos[0], legendDetailObject.legendIcon.legendIconPos[1]],
                zOffset: legendDetailObject.legendIcon.legendIconZOffset
            };
            let arrowMarker = {
                icon: new L.Icon({iconUrl: legendDetailObject.arrowIcon.arrowIconUrl, 
                iconSize: [legendDetailObject.arrowIcon.arrowIconSize[0], legendDetailObject.arrowIcon.arrowIconSize[1]]}),
                position: [legendDetailObject.arrowIcon.arrowIconPos[0], legendDetailObject.arrowIcon.arrowIconPos[1]],
                zOffset: legendDetailObject.arrowIcon.arrowIconZOffset
            };
            let mainQuestNumberMarker = {
                icon: new L.Icon({iconUrl: legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconUrl, 
                iconSize: [legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconSize[0], 
                legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconSize[1]]}),
                position: [legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconPos[0], 
                legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconPos[1]],
                zOffset: legendDetailObject.mainQuestNumberIcon.mainQuestNumberZOffset
            };
            let classQuestNumberMarker = {
                icon: new L.Icon({iconUrl: legendDetailObject.classQuestNumberIcon.classQuestNumberIconUrl, 
                iconSize: [legendDetailObject.classQuestNumberIcon.classQuestNumberIconSize[0], 
                legendDetailObject.classQuestNumberIcon.classQuestNumberIconSize[1]]}),
                position: [legendDetailObject.classQuestNumberIcon.classQuestNumberIconPos[0], 
                legendDetailObject.classQuestNumberIcon.classQuestNumberIconPos[1]],
                zOffset: legendDetailObject.classQuestNumberIcon.classQuestNumberZOffset
            };
            let sideQuestNumberMarker = {
                icon: new L.Icon({iconUrl: legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconUrl, 
                iconSize: [legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconSize[0], 
                legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconSize[1]]}),
                position: [legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconPos[0], 
                legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconPos[1]],
                zOffset: legendDetailObject.sideQuestNumberIcon.sideQuestNumberZOffset
            };
            let huntingLogQuestNumberMarker = {
                icon: new L.Icon({iconUrl: legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconUrl, 
                iconSize: [legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconSize[0], 
                legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconSize[1]]}),
                position: [legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconPos[0], 
                legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconPos[1]],
                zOffset: legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberZOffset
            };
            markers.push(legendMarker, classQuestNumberMarker, arrowMarker, mainQuestNumberMarker, 
                sideQuestNumberMarker, huntingLogQuestNumberMarker);
        })
    })

    markers.push(zoneMarker);
    createLegendIcons(legendDetails);
    
    let bounds = new L.LatLngBounds([-1,1], [-41.9, 41.9]);
    return (
        <MapContainer maxBounds={bounds} center={[-20.95, 20.95]} zoom={4.25}
            crs={L.CRS.Simple} maxBoundsViscosity={1} scrollWheelZoom={false} maxZoom={4.25}
            minZoom={4.25} style={{height: '825px', width: '100%'}} className='bg-lightbg z-20' zoomControl={false}>
            <ImageOverlay url={`../maps/${regionName}.jpg`} bounds={bounds} opacity={1} />
            {hoverOverlayDetails.map((hoverOverlayObject: TypeHoverOverlay) => {
                let legendOverlayIcon = new L.Icon({iconUrl: hoverOverlayObject.legendOverlayIcon.legendOverlayIconUrl, 
                iconSize: [hoverOverlayObject.legendOverlayIcon.legendOverlayIconSize[0], 
                hoverOverlayObject.legendOverlayIcon.legendOverlayIconSize[1]]});
                let highlightedMapIcon = new L.Icon({iconUrl: hoverOverlayObject.highlightedMapIcon.highlightedMapIconUrl, 
                iconSize: [hoverOverlayObject.highlightedMapIcon.highlightedMapIconSize[0],
                hoverOverlayObject.highlightedMapIcon.highlightedMapIconSize[1]]});
                let regionNameIcon = hoverOverlayObject.mapNameIcon.mapNameIconUrl;
                let regionLink = hoverOverlayObject.mapLinkUrl.split('/')[2].split('.')[0];
                return <Marker key={Math.random()} icon={legendOverlayIcon} 
                position={[hoverOverlayObject.legendOverlayIcon.legendOverlayIconPos[0], 
                hoverOverlayObject.legendOverlayIcon.legendOverlayIconPos[1]]} 
                zIndexOffset={1500} opacity={0.1}  eventHandlers={{
                    mouseover: () => {
                        if (highlightedMarkers.length === 0) {
                            addMarker(hoverOverlayObject.highlightedMapIcon.highlightedMapIconPos, highlightedMapIcon);
                            setNewZoneMarker(regionNameIcon);
                        }
                    },
                    mouseout: () => {
                        removeMarker();
                        resetZoneMarker();
                    }, 
                    click: () => {
                        router.push(`/zone/${regionLink}`);
                    }
                }} />
            })}
            {highlightedMarkers.map((marker: any) => {
                return <Marker key={marker} icon={marker.icon} position={[marker.position[0], marker.position[1]]} 
                zIndexOffset={0} opacity={1} interactive={false} />
            })}
            {markers.map((marker: any) => {
                return <Marker key={Math.random()} icon={marker.icon} position={[marker.position[0], marker.position[1]]} 
                zIndexOffset={marker.zOffset} opacity={1}/>
            })}
            <RegionBackButton />
        </MapContainer>
    )
}