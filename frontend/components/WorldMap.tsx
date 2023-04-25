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
    const { asPath } = router;
    let splitPathName: string = asPath.split('/').slice(-1)[0];
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
    const createIcon = ((url: string, size: number[]) => {
        let icon = new L.Icon({ iconUrl: url, iconSize: [size[0], size[1]]});
        return icon;
    }); 

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
    
    // let createRegionLegend = ((quests: any, region: string) => {
    //     let legendBoxIcon = `./icons/quest_legend_icons/QuestTotalsBox.png`;
    //     let legendPos = null;
    //     let arrowIcon = null;
    //     let arrowSize = null;
    //     let arrowOffset = null;
    //     let arrowPos = null;
    //     let mainStoryNumberIcon = '';
    //     let classNumberIcon = '';
    //     let sideNumberIcon = '';
    //     let huntingLogNumberIcon = '';

    //     if (region === 'La Noscea') {
    //         legendPos = worldMapAttributes.laNosceaLegendPos;
    //         arrowIcon = `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`;
    //         arrowSize = legendAttributes.vertArrowSize;
    //         arrowOffset = legendAttributes.vertArrowOffset;
    //         arrowPos = [legendPos[0] + arrowOffset, legendPos[1]];
    //         mainStoryNumberIcon = `/icons/quest_numbers/${laNosceaMainStoryStarters}.png`;
    //         classNumberIcon = `/icons/quest_numbers/${laNosceaClassStarters}.png`;
    //         sideNumberIcon = `/icons/quest_numbers/${laNosceaSideStarters}.png`;
    //         huntingLogNumberIcon = `/icons/quest_numbers/${laNosceaHuntingLogStarters}.png`;
    //     } else if (region === 'Thanalan') {
    //         legendPos = worldMapAttributes.thanalanLegendPos;
    //         arrowIcon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
    //         arrowSize = legendAttributes.horArrowSize;
    //         arrowOffset = -legendAttributes.horArrowOffset;
    //         arrowPos = [legendPos[0], legendPos[1] + arrowOffset];
    //         mainStoryNumberIcon = `/icons/quest_numbers/${thanalanMainStoryStarters}.png`;
    //         classNumberIcon = `/icons/quest_numbers/${thanalanClassStarters}.png`;
    //         sideNumberIcon = `/icons/quest_numbers/${thanalanSideStarters}.png`;
    //         huntingLogNumberIcon = `/icons/quest_numbers/${thanalanHuntingLogStarters}.png`;
    //     } else {
    //         legendPos = worldMapAttributes.theBlackShroudLegendPos;
    //         arrowIcon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
    //         arrowSize = legendAttributes.horArrowSize;
    //         arrowOffset = -legendAttributes.horArrowOffset;
    //         arrowPos = [legendPos[0], legendPos[1] + arrowOffset];
    //         mainStoryNumberIcon = `/icons/quest_numbers/${theBlackShroudMainStoryStarters}.png`;
    //         classNumberIcon = `/icons/quest_numbers/${theBlackShroudClassStarters}.png`;
    //         sideNumberIcon = `/icons/quest_numbers/${theBlackShroudSideStarters}.png`;
    //         huntingLogNumberIcon = `/icons/quest_numbers/${theBlackShroudHuntingLogStarters}.png`;
    //     }

    //     let legendIcon = {icon: new L.Icon({iconUrl: legendBoxIcon, 
    //         iconSize: [legendAttributes.legendSize[0], legendAttributes.legendSize[1]]}), 
    //         position: legendPos, z_offset: legendAttributes.legendZOffset};
    //     let legendArrow = {icon: new L.Icon({iconUrl: arrowIcon, iconSize: [arrowSize[0], arrowSize[1]]}), 
    //         position: arrowPos, z_offset: legendAttributes.arrowZOffset};
    //     let mainQuestNumber = {icon: new L.Icon({iconUrl: mainStoryNumberIcon, 
    //         iconSize: [legendAttributes.legendNumSize[0], legendAttributes.legendNumSize[1]]}), 
    //         position: [legendPos[0] + legendAttributes.topNumOffset, legendPos[1] + legendAttributes.leftNumOffset], 
    //         z_offset: legendAttributes.legendNumZOffset};
    //     let classQuestNumber = {icon: new L.Icon({iconUrl: classNumberIcon, 
    //         iconSize: [legendAttributes.legendNumSize[0], legendAttributes.legendNumSize[1]]}), 
    //         position: [legendPos[0] + legendAttributes.botNumOffset, legendPos[1] + legendAttributes.leftNumOffset], 
    //         z_offset: legendAttributes.legendNumZOffset};
    //     let sideQuestNumber = {icon: new L.Icon({iconUrl: sideNumberIcon, 
    //         iconSize: [legendAttributes.legendNumSize[0], legendAttributes.legendNumSize[1]]}), 
    //         position: [legendPos[0] + legendAttributes.topNumOffset, legendPos[1] + legendAttributes.rightNumOffset], 
    //         z_offset: legendAttributes.legendNumZOffset};
    //     let huntingLogNumber = {icon: new L.Icon({iconUrl: huntingLogNumberIcon, 
    //         iconSize: [legendAttributes.legendNumSize[0], legendAttributes.legendNumSize[0]]}), 
    //         position: [legendPos[0] + legendAttributes.botNumOffset, legendPos[1] + legendAttributes.rightNumOffset], 
    //         z_offset: legendAttributes.legendNumZOffset};
    //     let legendIcons = [legendIcon, legendArrow, mainQuestNumber, classQuestNumber, sideQuestNumber,
    //         huntingLogNumber]
            
    //     return legendIcons;
    // })

    // let laNosceaIcon = createIcon(`./highlighted_maps/LaNosceaHighlighted.jpg`, [220.1, 234.05]);
    // let thanalanIcon = createIcon(`./highlighted_maps/ThanalanHighlighted.jpg`, [283.65, 262.725]);
    // let theBlackShroudIcon = createIcon(`./highlighted_maps/TheBlackShroudHighlighted.jpg`, [279.775, 257.3]);
    // let laNosceaNameIcon = `./icons/region_names/LaNosceaRegionName.png`;
    // let thanalanNameIcon = `./icons/region_names/ThanalanRegionName.png`;
    // let theBlackShroudNameIcon = `./icons/region_names/TheBlackShroudRegionName.png`;
    // let laNosceaHighlightPos = [-23.46, 9.375];
    // let thanalanHighlightPos = [-30.51, 22.375];
    // let theBlackShroudHighlightPos = [-19.2, 28.45];
    // let laNosceaLegendIcons = createRegionLegend(laNosceaStarters, 'La Noscea');
    // let thanalanLegendIcons = createRegionLegend(thanalanStarters, 'Thanalan')
    // let theBlackShroudLegendIcons = createRegionLegend(theBlackShroudStarters, 'The Black Shroud')
    let bounds= new L.LatLngBounds([-1,1], [-41.9, 41.9]);
    console.log(legendDetails)
    return (
        <MapContainer maxBounds={bounds} center={[-20.95, 20.95]} zoom={4.25}
            crs={L.CRS.Simple} maxBoundsViscosity={1} scrollWheelZoom={false} maxZoom={4.25}
            minZoom={4.25} style={{height: '825px', width: '100%'}} className='bg-lightbg'>
            
            <ImageOverlay url={`./maps/${splitPathName}.jpg`} bounds={bounds} opacity={1} />
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