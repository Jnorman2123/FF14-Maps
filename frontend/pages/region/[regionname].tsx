import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveQuestsState, getNpcsState, getLaNosceaZoneNamesState, 
    getTheBlackShroudZoneNamesState, getThanalanZoneNamesState, getLaNosceaMapAttributesState, 
    getTheBlackShroudMapAttributesState, getThanalanMapAttributesState, updateHoverOverlayDetails, 
    updateLegendDetails, getLegendIconAttributesState } from '@/store/slices/dataStoreSlice';
import { TypeNpc, TypeQuest, TypeHoverOverlay, TypeLegend } from '@/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

interface RegionProps {
    zoneNameMarker: {
        iconUrl: string;
        iconSize: number[];
        iconPosition: number[];
    };
}

export default function Region({ zoneNameMarker }: RegionProps) {
    interface ZoneStarters {
        [key: string]: {
            npc: TypeNpc,
            questType: string,
        }[];
    };

    interface StarterQuestTypes {
        [key: string]: number;
    }

    const dispatch = useDispatch();
    const router = useRouter();
    const { asPath } = router;
    let regionName = asPath.split('/').slice(-1)[0].split(/(?=[A-Z])/).join(' ');
    let activeQuests = useSelector(getActiveQuestsState);
    let legendAttributes = useSelector(getLegendIconAttributesState);
    const MapWithNoSSR = React.useMemo(() =>  dynamic(() => import('../../components/RegionMap'), { ssr: false }), 
    [activeQuests]);
    let zoneNames: string[] = [];
    let npcs = useSelector(getNpcsState);
    let starters: {
        npc: TypeNpc,
        questType: string,
    }[] = [];
    let hoverOverlayDetails: TypeHoverOverlay[] = [];
    let mapAttributes = {};
    let zoneStarters: ZoneStarters = {};
    let starterQuestTypes: StarterQuestTypes = {};
    let zoneLegendDetails: TypeLegend[] = [];
    let laNosceaMapAttributes = useSelector(getLaNosceaMapAttributesState);
    let theBlackShroudMapAttributes = useSelector(getTheBlackShroudMapAttributesState);
    let thanalanMapAttributes = useSelector(getThanalanMapAttributesState);
    let laNosceaZoneNames = useSelector(getLaNosceaZoneNamesState);
    let theBlackShroudZoneNames = useSelector(getTheBlackShroudZoneNamesState);
    let thanalanZoneNames = useSelector(getThanalanZoneNamesState);
    
    zoneNameMarker = {
        iconUrl: `/icons/zone_names/SelectAZone.png`,
        iconSize: [205.7, 34.85],
        iconPosition: [0, 0]
    };

    if (regionName === 'La Noscea') {
        mapAttributes = laNosceaMapAttributes;
        zoneNames = laNosceaZoneNames;
        zoneNameMarker.iconPosition = [-7.5, 33.2];
    } else if (regionName === 'The Black Shroud') {
        mapAttributes = theBlackShroudMapAttributes;
        zoneNames = theBlackShroudZoneNames;
        zoneNameMarker.iconPosition = [-7.3, 21.5];
    } else {
        mapAttributes = thanalanMapAttributes;
        zoneNames = thanalanZoneNames;
        zoneNameMarker.iconPosition = [-7.3, 10];
    }
    
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
    
    starters.map(starter => {
        let zone = starter.npc.npc_zone.split('(')[0];
        if (!zoneStarters[zone]) {
            zoneStarters[zone] = []
        }
        zoneStarters[zone].push(starter);
    });

    Object.entries(zoneStarters).map(([key, value]) => {
        value.map(starter => {
            let keyName: string = key.concat(starter.questType)
            if (!starterQuestTypes[keyName]) {
                starterQuestTypes[keyName] = 1;
            } else {
                starterQuestTypes[keyName]++;
            }
        })
    });

    zoneNames.map((zone: string) => {
        let zoneLegendAttributes = {
            legendOverlayPos: [0,0],
            highlightedMapSize: [0,0],
            highlightedMapPos: [0,0],
            arrowIcon: '',
            arrowSize: [0,0],
            arrowPos: [0,0],
            mainStoryNumberIcon: 0,
            classNumberIcon: 0,
            sideNumberIcon: 0,
            huntingLogNumberIcon: 0,
        };
        Object.entries(mapAttributes).map(([key, value]) => {
            let zoneKey: string = key.charAt(0).toUpperCase() + key.slice(1).split(/(?=[A-Z])/).slice(0, -1).join(' ');
            
            if (zoneKey.includes('Uldah')) {
                let splitZoneKey: string[] = zoneKey.split(' ');
                splitZoneKey.splice(0, 1, `Ul'dah`);
                zoneKey = splitZoneKey.join(' ');
            }
            
            let mapAttribute = value as {
                arrowIcon: string;
                arrowPos: number[];
                arrowSize: number[];
                highlightPos: number[];
                highlightSize: number[];
                legendPos: number[]
            };
            
            if (zone === zoneKey) {
                zoneLegendAttributes.legendOverlayPos = mapAttribute.legendPos;
                zoneLegendAttributes.highlightedMapSize = mapAttribute.highlightSize;
                zoneLegendAttributes.highlightedMapPos = mapAttribute.highlightPos;
                zoneLegendAttributes.arrowIcon = mapAttribute.arrowIcon;
                zoneLegendAttributes.arrowSize = mapAttribute.arrowSize;
                zoneLegendAttributes.arrowPos = mapAttribute.arrowPos;
            }
        });
        
        Object.entries(starterQuestTypes).map(([key, value]) => {
            if (key.includes(zone)) {
                if (key.includes('Main Story')) {
                    zoneLegendAttributes.mainStoryNumberIcon = value;
                } else if (key.includes('Hunting Log')) {
                    zoneLegendAttributes.huntingLogNumberIcon = value;
                } else if (key.includes('Class')) {
                    zoneLegendAttributes.classNumberIcon = value;
                } else {
                    zoneLegendAttributes.sideNumberIcon = value;
                }
            }
        })

        let hoverOverlayObject: TypeHoverOverlay | undefined = {
            map: zone,
            mapNameIcon: {
                mapNameIconUrl: `/icons/zone_names/${zone.split(' ').join('')}.png`,
                mapNameIconPos: [-7.4, 21.5],
                mapNameIconSize: [205.7, 34.85],
            },
            highlightedMapIcon: {
                highlightedMapIconUrl: `/highlighted_maps/${zone.split(' ').join('')}Highlighted.jpg`,
                highlightedMapIconPos: zoneLegendAttributes.highlightedMapPos,
                highlightedMapIconSize: zoneLegendAttributes.highlightedMapSize,
            },
            legendOverlayIcon: {
                legendOverlayIconUrl: '/icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png',
                legendOverlayIconPos: zoneLegendAttributes.legendOverlayPos,
                legendOverlayIconSize: legendAttributes.legendSize,
            },
            mapLinkUrl: `/maps/${zone.split(' ').join('')}.jpg`,
        }
        hoverOverlayDetails.push(hoverOverlayObject);
        let legendObject: TypeLegend | undefined = {
            legendIcon: {
                legendIconUrl: `/icons/quest_legend_icons/QuestTotalsBox.png`,
                legendIconPos: zoneLegendAttributes.legendOverlayPos,
                legendIconSize: legendAttributes.legendSize,
                legendIconZOffset: legendAttributes.legendZOffset,
            },
            arrowIcon: {
                arrowIconUrl: zoneLegendAttributes.arrowIcon,
                arrowIconPos: zoneLegendAttributes.arrowPos,
                arrowIconSize: zoneLegendAttributes.arrowSize,
                arrowIconZOffset: legendAttributes.arrowZOffset,
            },
            mainQuestNumberIcon :{
                mainQuestNumberIconUrl: `/icons/quest_numbers/${zoneLegendAttributes.mainStoryNumberIcon}.png`,
                mainQuestNumberIconPos: [zoneLegendAttributes.legendOverlayPos[0] + legendAttributes.topNumOffset, 
                zoneLegendAttributes.legendOverlayPos[1] + legendAttributes.leftNumOffset],
                mainQuestNumberIconSize: legendAttributes.legendNumSize,
                mainQuestNumberZOffset: legendAttributes.legendNumZOffset,
            },
            classQuestNumberIcon :{
                classQuestNumberIconUrl: `/icons/quest_numbers/${zoneLegendAttributes.classNumberIcon}.png`,
                classQuestNumberIconPos: [zoneLegendAttributes.legendOverlayPos[0] + legendAttributes.botNumOffset, 
                zoneLegendAttributes.legendOverlayPos[1] + legendAttributes.leftNumOffset],
                classQuestNumberIconSize: legendAttributes.legendNumSize,
                classQuestNumberZOffset: legendAttributes.legendNumZOffset,
            },
            sideQuestNumberIcon :{
                sideQuestNumberIconUrl: `/icons/quest_numbers/${zoneLegendAttributes.sideNumberIcon}.png`,
                sideQuestNumberIconPos: [zoneLegendAttributes.legendOverlayPos[0] + legendAttributes.topNumOffset, 
                zoneLegendAttributes.legendOverlayPos[1] + legendAttributes.rightNumOffset],
                sideQuestNumberIconSize: legendAttributes.legendNumSize,
                sideQuestNumberZOffset: legendAttributes.legendNumZOffset,
            },
            huntingLogQuestNumberIcon :{
                huntingLogQuestNumberIconUrl: `/icons/quest_numbers/${zoneLegendAttributes.huntingLogNumberIcon}.png`,
                huntingLogQuestNumberIconPos: [zoneLegendAttributes.legendOverlayPos[0] + legendAttributes.botNumOffset, 
                zoneLegendAttributes.legendOverlayPos[1] + legendAttributes.rightNumOffset],
                huntingLogQuestNumberIconSize: legendAttributes.legendNumSize,
                huntingLogQuestNumberZOffset: legendAttributes.legendNumZOffset,
            },
        }
        zoneLegendDetails.push(legendObject);
    })

    
    
    const setLegendDetails = () => {
        dispatch(updateHoverOverlayDetails({hoverOverlayDetailsArray: hoverOverlayDetails}));
        dispatch(updateLegendDetails({legendDetailsArray: zoneLegendDetails}));
    }
    
    setLegendDetails();

    return <div >
        <div id='map' >
            <MapWithNoSSR zoneNameMarker={zoneNameMarker} />
        </div>
    </div>;
}
