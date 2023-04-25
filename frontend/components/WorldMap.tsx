import { MapContainer, Marker, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getHoverOverlayDetailsState, getLegendDetailsState } from '@/store/slices/dataStoreSlice';
import type { TypeHoverOverlay, TypeLegend } from '@/types';

const WorldMapComponent = () => {
    const [zoneMarker, setZoneMarker] = useState({icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, 
        iconSize: [205.7, 34.85]}), position: [-7.4, 21.5], zOffset: 100});
    const [highlightedMarkers, setHighlightedMarkers] = useState<any[]>([]);
    const router = useRouter();
    let hoverOverlayDetails: TypeHoverOverlay[] = useSelector(getHoverOverlayDetailsState);
    let legendDetails: TypeLegend[] = useSelector(getLegendDetailsState);
    let markers: any[] = [];

    const addMarker = ((pos: number[], icon: any) => {
        let marker = {icon: icon, position: pos};
        setHighlightedMarkers([...highlightedMarkers, marker]);
    });

    const removeMarker = () => {
        setHighlightedMarkers([]);
    };
    
    const newZoneMarker = ((regionIconUrl: string) => {
        setZoneMarker({icon: new L.Icon({iconUrl: regionIconUrl, iconSize: [205.7, 34.85]}), 
        position: [-7.4, 21.5], zOffset: 100})
    });

    const resetZoneMarker = () => {
        setZoneMarker({icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, 
            iconSize: [205.7, 34.85]}), position: [-7.4, 21.5], zOffset: 100});
    };

    legendDetails.map((legendDetailObject: TypeLegend) => {
        let legendMarker = {
            icon: new L.Icon({iconUrl: legendDetailObject.legendIcon.legendIconUrl, 
            iconSize: [legendDetailObject.legendIcon.legendIconSize[0], legendDetailObject.legendIcon.legendIconSize[1]]}),
            position: [legendDetailObject.legendIcon.legendIconPos[0], legendDetailObject.legendIcon.legendIconPos[1]],
            zOffset: legendDetailObject.legendIcon.legendIconZOffset
        };
        markers.push(legendMarker);
        let arrowMarker = {
            icon: new L.Icon({iconUrl: legendDetailObject.arrowIcon.arrowIconUrl, 
            iconSize: [legendDetailObject.arrowIcon.arrowIconSize[0], legendDetailObject.arrowIcon.arrowIconSize[1]]}),
            position: [legendDetailObject.arrowIcon.arrowIconPos[0], legendDetailObject.arrowIcon.arrowIconPos[1]],
            zOffset: legendDetailObject.arrowIcon.arrowIconZOffset
        };
        markers.push(arrowMarker);
        let mainQuestNumberMarker = {
            icon: new L.Icon({iconUrl: legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconUrl, 
            iconSize: [legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconSize[0], 
            legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconSize[1]]}),
            position: [legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconPos[0], 
            legendDetailObject.mainQuestNumberIcon.mainQuestNumberIconPos[1]],
            zOffset: legendDetailObject.mainQuestNumberIcon.mainQuestNumberZOffset
        };
        markers.push(mainQuestNumberMarker);
        let classQuestNumberMarker = {
            icon: new L.Icon({iconUrl: legendDetailObject.classQuestNumberIcon.classQuestNumberIconUrl, 
            iconSize: [legendDetailObject.classQuestNumberIcon.classQuestNumberIconSize[0], 
            legendDetailObject.classQuestNumberIcon.classQuestNumberIconSize[1]]}),
            position: [legendDetailObject.classQuestNumberIcon.classQuestNumberIconPos[0], 
            legendDetailObject.classQuestNumberIcon.classQuestNumberIconPos[1]],
            zOffset: legendDetailObject.classQuestNumberIcon.classQuestNumberZOffset
        };
        markers.push(classQuestNumberMarker);
        let sideQuestNumberMarker = {
            icon: new L.Icon({iconUrl: legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconUrl, 
            iconSize: [legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconSize[0], 
            legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconSize[1]]}),
            position: [legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconPos[0], 
            legendDetailObject.sideQuestNumberIcon.sideQuestNumberIconPos[1]],
            zOffset: legendDetailObject.sideQuestNumberIcon.sideQuestNumberZOffset
        };
        markers.push(sideQuestNumberMarker);
        let huntingLogQuestNumberMarker = {
            icon: new L.Icon({iconUrl: legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconUrl, 
            iconSize: [legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconSize[0], 
            legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconSize[1]]}),
            position: [legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconPos[0], 
            legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberIconPos[1]],
            zOffset: legendDetailObject.huntingLogQuestNumberIcon.huntingLogQuestNumberZOffset
        };
        markers.push(huntingLogQuestNumberMarker);
    })

    markers.push(zoneMarker);
    let bounds= new L.LatLngBounds([-1,1], [-41.9, 41.9]);
    return (
        <MapContainer maxBounds={bounds} center={[-20.95, 20.95]} zoom={4.25}
            crs={L.CRS.Simple} maxBoundsViscosity={1} scrollWheelZoom={false} maxZoom={4.25}
            minZoom={4.25} style={{height: '825px', width: '100%'}} className='bg-lightbg'>
            
            <ImageOverlay url={`./maps/world.jpg`} bounds={bounds} opacity={1} />
            {hoverOverlayDetails.map((hoverOverlayObject: TypeHoverOverlay) => {
                let legendOverlayIcon = new L.Icon({iconUrl: hoverOverlayObject.legendOverlayIcon.legendOverlayIconUrl, 
                iconSize: [hoverOverlayObject.legendOverlayIcon.legendOverlayIconSize[0], 
                hoverOverlayObject.legendOverlayIcon.legendOverlayIconSize[1]]});
                let highlightedMapIcon = new L.Icon({iconUrl: hoverOverlayObject.highlightedMapIcon.highlightedMapIconUrl, 
                iconSize: [hoverOverlayObject.highlightedMapIcon.highlightedMapIconSize[0],
                hoverOverlayObject.highlightedMapIcon.highlightedMapIconSize[1]]});
                let regionNameIcon = hoverOverlayObject.mapNameIcon.mapNameIconUrl;
                let regionLink = hoverOverlayObject.mapLinkUrl;
                return <Marker key={Math.random()} icon={legendOverlayIcon} 
                position={[hoverOverlayObject.legendOverlayIcon.legendOverlayIconPos[0], 
                hoverOverlayObject.legendOverlayIcon.legendOverlayIconPos[1]]} 
                zIndexOffset={1500} opacity={0.1}  eventHandlers={{
                    mouseover: () => {
                        if (highlightedMarkers.length === 0) {
                            addMarker(hoverOverlayObject.highlightedMapIcon.highlightedMapIconPos, highlightedMapIcon);
                            newZoneMarker(regionNameIcon);
                        }
                    },
                    mouseout: () => {
                        removeMarker();
                        resetZoneMarker();
                    }, 
                    click: () => {
                        router.push(`/region/${regionLink}`);
                    }
                }} />
            })}
            {highlightedMarkers.map((marker: any) => {
                return <Marker key={marker} icon={marker.icon} position={[marker.position[0], marker.position[1]]} 
                zIndexOffset={0} opacity={1} interactive={false} />
            })}
            {legendDetails.map((legendDetailObject: TypeLegend) => {
                let legendIcon = new L.Icon({iconUrl: legendDetailObject.legendIcon.legendIconUrl, 
                iconSize: [legendDetailObject.legendIcon.legendIconSize[0], legendDetailObject.legendIcon.legendIconSize[1]]})
                return <Marker key={Math.random()} icon={legendIcon} 
                position={[legendDetailObject.legendIcon.legendIconPos[0], legendDetailObject.legendIcon.legendIconPos[1]]} />
            })}
            {markers.map((marker: any) => {
                return <Marker key={Math.random()} icon={marker.icon} position={[marker.position[0], marker.position[1]]} 
                zIndexOffset={marker.zOffset} opacity={1}/>
            })}
        </MapContainer>
    )
}

export default WorldMapComponent;