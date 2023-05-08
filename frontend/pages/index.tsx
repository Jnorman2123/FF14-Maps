import { useSelector, useDispatch } from 'react-redux';
import { getLegendIconAttributesState, getWorldMapAttributesState, getActiveQuestsState, 
    getNpcsState, getOriginalRegionsState, updateHoverOverlayDetails, updateLegendDetails } from '@/store/slices/dataStoreSlice';
import { TypeNpc, TypeQuest, TypeHoverOverlay, TypeLegend } from '@/types';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

const World = () => {
    
    const dispatch = useDispatch();
    const MapWithNoSSR = dynamic(() => import('../components/WorldMap'), { ssr: false });
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
                    highlightedMapIconUrl: `/highlighted_maps/${regionName}Highlighted.jpg`,
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
                    mainQuestNumberZOffset: legendAttributes.legendNumZOffset,
                },
                classQuestNumberIcon :{
                    classQuestNumberIconUrl: classNumberIcon,
                    classQuestNumberIconPos: [legendOverlayPos[0] + legendAttributes.botNumOffset, 
                    legendOverlayPos[1] + legendAttributes.leftNumOffset],
                    classQuestNumberIconSize: legendAttributes.legendNumSize,
                    classQuestNumberZOffset: legendAttributes.legendNumZOffset,
                },
                sideQuestNumberIcon :{
                    sideQuestNumberIconUrl: sideNumberIcon,
                    sideQuestNumberIconPos: [legendOverlayPos[0] + legendAttributes.topNumOffset, 
                    legendOverlayPos[1] + legendAttributes.rightNumOffset],
                    sideQuestNumberIconSize: legendAttributes.legendNumSize,
                    sideQuestNumberZOffset: legendAttributes.legendNumZOffset,
                },
                huntingLogQuestNumberIcon :{
                    huntingLogQuestNumberIconUrl: huntingLogNumberIcon,
                    huntingLogQuestNumberIconPos: [legendOverlayPos[0] + legendAttributes.botNumOffset, 
                    legendOverlayPos[1] + legendAttributes.rightNumOffset],
                    huntingLogQuestNumberIconSize: legendAttributes.legendNumSize,
                    huntingLogQuestNumberZOffset: legendAttributes.legendNumZOffset,
                },
            }
            legendDetails.push(legendObject);
        })
        dispatch(updateHoverOverlayDetails({hoverOverlayDetailsArray: hoverOverlayDetails}));
        dispatch(updateLegendDetails({legendDetailsArray: legendDetails}));
    }
    
    setLegendDetails();

    return <div>
      <NextSeo title='World Map Title' description='World Map' />
        <div id='map'>
            <MapWithNoSSR />
        </div>
    </div>;
}

export default World;
