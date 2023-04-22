import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLegendIconAttributesState, getWorldMapAttributesState, getActiveQuestsState, 
    getNpcsState, getOriginalRegionsState, updateHoverOverlayDetails, updateLegendDetails } from '@/store/slices/dataStoreSlice';
import { TypeNpc, TypeQuest, TypeHoverOverlay, TypeLegend } from '@/types';

const World = () => {
    // const [zone_marker, setZoneMarker] = useState({icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, 
    //     iconSize: [205.7, 34.85]}), position: [-7.4, 21.5]},);
    // const [highlighted_markers, setHighlightedMarkers] = useState<any[]>([]);
    // const router = useRouter();
    const dispatch = useDispatch();
    let worldMapAttributes = useSelector(getWorldMapAttributesState);
    let legendAttributes = useSelector(getLegendIconAttributesState);
    let npcs = useSelector(getNpcsState);
    let activeQuests = useSelector(getActiveQuestsState);
    let regions = useSelector(getOriginalRegionsState);
    let starters: {
        npc: TypeNpc,
        questType: string,
    }[] = [];
    let laNosceaStarters: string[] = [];
    let thanalanStarters: string[] = [];
    let theBlackShroudStarters: string[] = [];
    let hoverOverlayDetails: TypeHoverOverlay[] = [];
    let legendDetails: TypeLegend[] = [];
    
    // const addMarker = ((pos: number[], icon: any) => {
    //     let marker = {icon: icon, position: pos};
    //     setHighlightedMarkers([...highlighted_markers, marker]);
    // });

    // const removeMarker = () => {
    //     setHighlightedMarkers([]);
    // };
    
    // const newZoneMarker = ((regionIconUrl: string) => {
    //     setZoneMarker({icon: new L.Icon({iconUrl: regionIconUrl, iconSize: [205.7, 34.85]}), 
    //     position: [-7.4, 21.5]})
    // });

    // const resetZoneMarker = () => {
    //     setZoneMarker({icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, 
    //         iconSize: [205.7, 34.85]}), position: [-7.4, 21.5]});
    // };

    // const createIcon = ((url: string, size: number[]) => {
    //     let icon = new L.Icon({ iconUrl: url, iconSize: [size[0], size[1]]});
    //     return icon;
    // }); 
    activeQuests.map((quest: TypeQuest) => {
        let npc: TypeNpc | undefined = npcs.find((npc: TypeNpc) => npc.id === quest.quest_npcs[0]);
        if (npc) {
            let starter = {
                npc: npc,
                questType: quest.quest_type
            }
            starters.push(starter);
        }
    })

    starters.map((starter: any) => {
        if (starter.npc.npc_zone.includes('Thanalan')) {
            thanalanStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('The Black Shroud')) {
            theBlackShroudStarters.push(starter.questType);
        } else {
            laNosceaStarters.push(starter.questType)
        }
    })

    let thanalanMainStoryStarters: number = thanalanStarters.filter((starter: string) => starter === 'Main Story').length;
    let thanalanClassStarters: number = thanalanStarters.filter((starter: string) => starter === 'Class').length;
    let thanalanSideStarters: number = thanalanStarters.filter((starter: string) => starter === 'Side').length;
    let thanalanHuntingLogStarters: number = thanalanStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let theBlackShroudMainStoryStarters: number = 
    theBlackShroudStarters.filter((starter: string) => starter === 'Main Story').length;
    let theBlackShroudClassStarters: number = theBlackShroudStarters.filter((starter: string) => starter === 'Class').length;
    let theBlackShroudSideStarters: number = theBlackShroudStarters.filter((starter: string) => starter === 'Side').length;
    let theBlackShroudHuntingLogStarters: number = 
    theBlackShroudStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let laNosceaMainStoryStarters: number = laNosceaStarters.filter((starter: string) => starter === 'Main Story').length;
    let laNosceaClassStarters: number = laNosceaStarters.filter((starter: string) => starter === 'Class').length;
    let laNosceaSideStarters: number = laNosceaStarters.filter((starter: string) => starter === 'Side').length;
    let laNosceaHuntingLogStarters: number = laNosceaStarters.filter((starter: string) => starter === 'Hunting Log').length;

    const setLegendDetails = () => {
        regions.map((region: string) => {
            let regionName = region.split(' ').join('');
            let regionLink = region.split(' ').join('-');
            let legendOverlayPos: number[] = [];
            let highlightedMapSize: number[] = [];
            let highlightedMapPos: number[] = [];
            let arrowIcon: string = '';
            let arrowSize: number[] = [];
            let arrowOffset: number;
            let arrowPos: number[] = [];
            let mainStoryNumberIcon: string = '';
            let classNumberIcon: string = '';
            let sideNumberIcon: string = '';
            let huntingLogNumberIcon: string = '';
            if (region === 'La Noscea') {
                legendOverlayPos = worldMapAttributes.laNosceaLegendPos;
                highlightedMapSize = [220.1, 234.05];
                highlightedMapPos = [-23.46, 9.375];
                arrowIcon = `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`;
                arrowSize = legendAttributes.vertArrowSize;
                arrowOffset = legendAttributes.vertArrowOffset;
                arrowPos = [legendOverlayPos[0] + arrowOffset, legendOverlayPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${laNosceaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${laNosceaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${laNosceaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${laNosceaHuntingLogStarters}.png`;
            } else if (region === 'The Black Shroud') {
                legendOverlayPos = worldMapAttributes.theBlackShroudLegendPos;
                highlightedMapSize = [279.775, 257.3];
                highlightedMapPos = [-19.2, 28.45];
                arrowIcon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
                arrowSize = legendAttributes.horArrowSize;
                arrowOffset = -legendAttributes.horArrowOffset;
                arrowPos = [legendOverlayPos[0], legendOverlayPos[1] + arrowOffset];
                mainStoryNumberIcon = `/icons/quest_numbers/${theBlackShroudMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${theBlackShroudClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${theBlackShroudSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${theBlackShroudHuntingLogStarters}.png`;
            } else {
                legendOverlayPos = worldMapAttributes.thanalanLegendPos;
                highlightedMapSize = [283.65, 262.725];
                highlightedMapPos = [-30.51, 22.375];
                arrowIcon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
                arrowSize = legendAttributes.horArrowSize;
                arrowOffset = -legendAttributes.horArrowOffset;
                arrowPos = [legendOverlayPos[0], legendOverlayPos[1] + arrowOffset];
                mainStoryNumberIcon = `/icons/quest_numbers/${thanalanMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${thanalanClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${thanalanSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${thanalanHuntingLogStarters}.png`;
            }
            let hoverOverlayObject: TypeHoverOverlay | undefined = {
                map: region,
                mapNameIcon: {
                    mapNameIconUrl: `/icons/region_names/${regionName}RegionName.png`,
                    mapNameIconPos: [-7.4, 21.5],
                    mapNameIconSize: [205.7, 34.85],
                },
                highlightedMapIcon: {
                    highlightedMapIconUrl: `/icons./highlighted_maps/${regionName}Highlighted.jpg`,
                    highlightedMapIconPos: highlightedMapPos,
                    highlightedMapIconSize: highlightedMapSize ,
                },
                legendOverlayIcon: {
                    legendOverlayIconUrl: '/icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png',
                    legendOverlayIconPos: legendOverlayPos,
                    legendOverlayIconSize: legendAttributes.legendSize,
                },
                mapLinkUrl: regionLink,
            }
            hoverOverlayDetails.push(hoverOverlayObject);
            let legendObject: TypeLegend | undefined = {
                legendIcon: {
                    legendIconUrl: `./icons/quest_legend_icons/QuestTotalsBox.png`,
                    legendIconPos: legendOverlayPos,
                    legendIconSize: legendAttributes.legendSize,
                    legendIconZOffset: legendAttributes.legendZOffset,
                },
                arrowIcon: {
                    arrowIconUrl: arrowIcon,
                    arrowIconPos: arrowPos,
                    arrowIconSize: arrowSize,
                    arrowIconZOffset: legendAttributes.arrowZOffset,
                },
                mainQuestNumberIcon :{
                    mainQuestNumberIconUrl: mainStoryNumberIcon,
                    mainQuestNumberIconPos: [legendOverlayPos[0] + legendAttributes.topNumOffset, 
                    legendOverlayPos[1] + legendAttributes.leftNumOffset],
                    mainQuestNumberIconSize: legendAttributes.legendNumSize,
                },
                classQuestNumberIcon :{
                    classQuestNumberIconUrl: classNumberIcon,
                    classQuestNumberIconPos: [legendOverlayPos[0] + legendAttributes.botNumOffset, 
                    legendOverlayPos[1] + legendAttributes.leftNumOffset],
                    classQuestNumberIconSize: legendAttributes.legendNumSize,
                },
                sideQuestNumberIcon :{
                    sideQuestNumberIconUrl: sideNumberIcon,
                    sideQuestNumberIconPos: [legendOverlayPos[0] + legendAttributes.topNumOffset, 
                    legendOverlayPos[1] + legendAttributes.rightNumOffset],
                    sideQuestNumberIconSize: legendAttributes.legendNumSize,
                },
                huntingLogQuestNumberIcon :{
                    huntingLogQuestNumberIconUrl: huntingLogNumberIcon,
                    huntingLogQuestNumberIconPos: [legendOverlayPos[0] + legendAttributes.botNumOffset, 
                    legendOverlayPos[1] + legendAttributes.rightNumOffset],
                    huntingLogQuestNumberIconSize: legendAttributes.legendNumSize,
                },
            }
            legendDetails.push(legendObject);
        })
        dispatch(updateHoverOverlayDetails({hoverOverlayDetailsArray: hoverOverlayDetails}));
        dispatch(updateLegendDetails({legendDetailsArray: legendDetails}));
    }
    
    setLegendDetails();

    // let createHoverOverlay = ((region: string, regionIcon: any, regionNameIcon: any, highlightPos: number[]) => {
    //     let regionLink = `/${region.split(" ").join('').toLowerCase()}`;
    //     let legendOverlayPos = null;
    //     let legend_overlay_icon = `./icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png`;
    //     let legend_overlay = new L.Icon({iconUrl: legend_overlay_icon, 
    //         iconSize: [legendAttributes.legendSize[0], legendAttributes.legendSize[1]]});
    //     if (region === 'La Noscea') {
    //         legendOverlayPos = worldMapAttributes.laNosceaLegendPos;
    //     } else if (region === 'Thanalan') {
    //         legendOverlayPos = worldMapAttributes.thanalanLegendPos;
    //     } else {
    //         legendOverlayPos = worldMapAttributes.theBlackShroudLegendPos;
    //     }

    //     return <Marker key={Math.random()} icon={legend_overlay} position={[legendOverlayPos[0], legendOverlayPos[1]]} 
    //     zIndexOffset={1500} opacity={.1}  eventHandlers={{
    //         mouseover: () => {
    //             if (highlighted_markers.length === 0) {
    //                 addMarker(highlightPos, regionIcon);
    //                 newZoneMarker(regionNameIcon);
    //             }
    //         },
    //         mouseout: () => {
    //             removeMarker();
    //             resetZoneMarker();
    //         }, 
    //         click: () => {
    //             router.push(regionLink);
    //         }
    //     }} />
    // })

    
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
    // let laNosceaOverlay = createHoverOverlay('La Noscea', laNosceaIcon, laNosceaNameIcon, laNosceaHighlightPos);
    // let thanalanOverlay = createHoverOverlay('Thanalan', thanalanIcon, thanalanNameIcon, thanalanHighlightPos);
    // let theBlackShroudOverlay = createHoverOverlay('The Black Shroud', theBlackShroudIcon, theBlackShroudNameIcon, 
    //     theBlackShroudHighlightPos);
    // let hoverOverlays = [laNosceaOverlay, thanalanOverlay, theBlackShroudOverlay];
    // let bounds= L.latLngBounds([[-1,1], [-41.9, 41.9]]);

    return (
        <div>hello world</div>
        // <WorldMap mapName={props.mapName} bounds={bounds} center={props.center} 
        // zoom={props.zoom} props={[zone_marker, highlighted_markers]} la_noscea_legend_icons={la_noscea_legend_icons} 
        // thanalan_legend_icons={thanalan_legend_icons} the_black_shroud_legend_icons={the_black_shroud_legend_icons} 
        // hover_overlays={hover_overlays} />
    )
}

export default World;