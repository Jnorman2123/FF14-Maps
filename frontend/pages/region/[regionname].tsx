import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { getLegendIconAttributesState, getActiveQuestsState, getNpcsState, getLaNosceaZoneNamesState, 
    getTheBlackShroudZoneNamesState, getThanalanZoneNamesState, getLaNosceaMapAttributesState, 
    getTheBlackShroudMapAttributesState, getThanalanMapAttributesState, updateHoverOverlayDetails, 
    updateLegendDetails } from '@/store/slices/dataStoreSlice';
import { TypeNpc, TypeQuest, TypeHoverOverlay, TypeLegend } from '@/types';
import dynamic from 'next/dynamic';

const Region = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const MapWithNoSSR = dynamic(() => import('../../components/RegionMap'), { ssr: false });
    let laNosceaMapAttributes = useSelector(getLaNosceaMapAttributesState);
    let theBlackShroudMapAttributes = useSelector(getTheBlackShroudMapAttributesState);
    let thanalanMapAttributes = useSelector(getThanalanMapAttributesState);
    let legendAttributes = useSelector(getLegendIconAttributesState);
    let zones = useSelector(getLaNosceaZoneNamesState).concat(useSelector(getTheBlackShroudZoneNamesState)).
    concat(useSelector(getThanalanZoneNamesState));
    let npcs = useSelector(getNpcsState);
    let activeQuests = useSelector(getActiveQuestsState);
    let starters: {
        npc: TypeNpc,
        questType: string,
    }[] = [];
    let limsaLominsaUpperDecksStarters: string[] = [];
    let limsaLominsaLowerDecksStarters: string[] = [];
    let middleLaNosceaStarters: string[] = [];
    let easternLaNosceaStarters: string[] = [];
    let lowerLaNosceaStarters: string[] = [];
    let westernLaNosceaStarters: string[] = [];
    let upperLaNosceaStarters: string[] = [];
    let outerLaNosceaStarters: string[] = [];
    let newGridaniaStarters: string[] = [];
    let oldGridaniaStarters: string[] = [];
    let centralShroudStarters: string[] = [];
    let eastShroudStarters: string[] = [];
    let southShroudStarters: string[] = [];
    let northShroudStarters: string[] = [];
    let uldahStepsOfNaldStarters: string[] = [];
    let uldahStepsOfThalStarters: string[] = [];
    let hustingsStripStarters: string[] = [];
    let westernThanalanStarters: string[] = [];
    let easternThanalanStarters: string[] = [];
    let centralThanalanStarters: string[] = [];
    let southernThanalanStarters: string[] = [];
    let northernThanalanStarters: string[] = [];
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
        if (starter.npc.npc_zone.includes('Limsa Lominsa Upper Decks')) {
            limsaLominsaUpperDecksStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Limsa Lominsa Lower Decks')) {
            limsaLominsaLowerDecksStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Middle La Noscea')) {
            middleLaNosceaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Lower La Noscea')) {
            lowerLaNosceaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Eastern La Noscea')) {
            easternLaNosceaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Western La Noscea')) {
            westernLaNosceaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Upper La Noscea')) {
            upperLaNosceaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Outer La Noscea')) {
            outerLaNosceaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('New Gridania')) {
            newGridaniaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Old Gridania')) {
            oldGridaniaStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Central Shroud')) {
            centralShroudStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('East Shroud')) {
            eastShroudStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('South Shroud')) {
            southShroudStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('North Shroud')) {
            northShroudStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes(`Ul'dah - Steps of Nald`)) {
            uldahStepsOfNaldStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes(`Ul'dah - Steps of Thal`)) {
            uldahStepsOfThalStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Hustings Strip')) {
            hustingsStripStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Western Thanalan')) {
            westernThanalanStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Eastern Thanalan')) {
            easternThanalanStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Central Thanalan')) {
            centralThanalanStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Southern Thanalan')) {
            southernThanalanStarters.push(starter.questType);
        } else if (starter.npc.npc_zone.includes('Northern Thanalan')) {
            northernThanalanStarters.push(starter.questType);
        } 
    })

    let limsaLominsaUpperDecksMainStoryStarters: number = 
    limsaLominsaUpperDecksStarters.filter((starter: string) => starter === 'Main Story').length;
    let limsaLominsaUpperDecksClassStarters: number = 
    limsaLominsaUpperDecksStarters.filter((starter: string) => starter === 'Class').length;
    let limsaLominsaUpperDecksSideStarters: number = 
    limsaLominsaUpperDecksStarters.filter((starter: string) => starter === 'Side').length;
    let limsaLominsaUpperDecksHuntingLogStarters: number = 
    limsaLominsaUpperDecksStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let limsaLominsaLowerDecksMainStoryStarters: number = 
    limsaLominsaLowerDecksStarters.filter((starter: string) => starter === 'Main Story').length;
    let limsaLominsaLowerDecksClassStarters: number = 
    limsaLominsaLowerDecksStarters.filter((starter: string) => starter === 'Class').length;
    let limsaLominsaLowerDecksSideStarters: number = 
    limsaLominsaLowerDecksStarters.filter((starter: string) => starter === 'Side').length;
    let limsaLominsaLowerDecksHuntingLogStarters: number = 
    limsaLominsaLowerDecksStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let middleLaNosceaMainStoryStarters: number = 
    middleLaNosceaStarters.filter((starter: string) => starter === 'Main Story').length;
    let middleLaNosceaClassStarters: number = 
    middleLaNosceaStarters.filter((starter: string) => starter === 'Class').length;
    let middleLaNosceaSideStarters: number = 
    middleLaNosceaStarters.filter((starter: string) => starter === 'Side').length;
    let middleLaNosceaHuntingLogStarters: number = 
    middleLaNosceaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let lowerLaNosceaMainStoryStarters: number = 
    lowerLaNosceaStarters.filter((starter: string) => starter === 'Main Story').length;
    let lowerLaNosceaClassStarters: number = 
    lowerLaNosceaStarters.filter((starter: string) => starter === 'Class').length;
    let lowerLaNosceaSideStarters: number = 
    lowerLaNosceaStarters.filter((starter: string) => starter === 'Side').length;
    let lowerLaNosceaHuntingLogStarters: number = 
    lowerLaNosceaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let easternLaNosceaMainStoryStarters: number = 
    easternLaNosceaStarters.filter((starter: string) => starter === 'Main Story').length;
    let easternLaNosceaClassStarters: number = 
    easternLaNosceaStarters.filter((starter: string) => starter === 'Class').length;
    let easternLaNosceaSideStarters: number = 
    easternLaNosceaStarters.filter((starter: string) => starter === 'Side').length;
    let easternLaNosceaHuntingLogStarters: number = 
    easternLaNosceaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let westernLaNosceaMainStoryStarters: number = 
    westernLaNosceaStarters.filter((starter: string) => starter === 'Main Story').length;
    let westernLaNosceaClassStarters: number = 
    westernLaNosceaStarters.filter((starter: string) => starter === 'Class').length;
    let westernLaNosceaSideStarters: number = 
    westernLaNosceaStarters.filter((starter: string) => starter === 'Side').length;
    let westernLaNosceaHuntingLogStarters: number = 
    westernLaNosceaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let upperLaNosceaMainStoryStarters: number = 
    upperLaNosceaStarters.filter((starter: string) => starter === 'Main Story').length;
    let upperLaNosceaClassStarters: number = 
    upperLaNosceaStarters.filter((starter: string) => starter === 'Class').length;
    let upperLaNosceaSideStarters: number = 
    upperLaNosceaStarters.filter((starter: string) => starter === 'Side').length;
    let upperLaNosceaHuntingLogStarters: number = 
    upperLaNosceaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let outerLaNosceaMainStoryStarters: number = 
    outerLaNosceaStarters.filter((starter: string) => starter === 'Main Story').length;
    let outerLaNosceaClassStarters: number = 
    outerLaNosceaStarters.filter((starter: string) => starter === 'Class').length;
    let outerLaNosceaSideStarters: number = 
    outerLaNosceaStarters.filter((starter: string) => starter === 'Side').length;
    let outerLaNosceaHuntingLogStarters: number = 
    outerLaNosceaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let newGridaniaMainStoryStarters: number = 
    newGridaniaStarters.filter((starter: string) => starter === 'Main Story').length;
    let newGridaniaClassStarters: number = 
    newGridaniaStarters.filter((starter: string) => starter === 'Class').length;
    let newGridaniaSideStarters: number = 
    newGridaniaStarters.filter((starter: string) => starter === 'Side').length;
    let newGridaniaHuntingLogStarters: number = 
    newGridaniaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let oldGridaniaMainStoryStarters: number = 
    oldGridaniaStarters.filter((starter: string) => starter === 'Main Story').length;
    let oldGridaniaClassStarters: number = 
    oldGridaniaStarters.filter((starter: string) => starter === 'Class').length;
    let oldGridaniaSideStarters: number = 
    oldGridaniaStarters.filter((starter: string) => starter === 'Side').length;
    let oldGridaniaHuntingLogStarters: number = 
    oldGridaniaStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let centralShroudMainStoryStarters: number = 
    centralShroudStarters.filter((starter: string) => starter === 'Main Story').length;
    let centralShroudClassStarters: number = 
    centralShroudStarters.filter((starter: string) => starter === 'Class').length;
    let centralShroudSideStarters: number = 
    centralShroudStarters.filter((starter: string) => starter === 'Side').length;
    let centralShroudHuntingLogStarters: number = 
    centralShroudStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let eastShroudMainStoryStarters: number = 
    eastShroudStarters.filter((starter: string) => starter === 'Main Story').length;
    let eastShroudClassStarters: number = 
    eastShroudStarters.filter((starter: string) => starter === 'Class').length;
    let eastShroudSideStarters: number = 
    eastShroudStarters.filter((starter: string) => starter === 'Side').length;
    let eastShroudHuntingLogStarters: number = 
    eastShroudStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let southShroudMainStoryStarters: number = 
    southShroudStarters.filter((starter: string) => starter === 'Main Story').length;
    let southShroudClassStarters: number = 
    southShroudStarters.filter((starter: string) => starter === 'Class').length;
    let southShroudSideStarters: number = 
    southShroudStarters.filter((starter: string) => starter === 'Side').length;
    let southShroudHuntingLogStarters: number = 
    southShroudStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let northShroudMainStoryStarters: number = 
    northShroudStarters.filter((starter: string) => starter === 'Main Story').length;
    let northShroudClassStarters: number = 
    northShroudStarters.filter((starter: string) => starter === 'Class').length;
    let northShroudSideStarters: number = 
    northShroudStarters.filter((starter: string) => starter === 'Side').length;
    let northShroudHuntingLogStarters: number = 
    northShroudStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let uldahStepsOfNaldMainStoryStarters: number = 
    uldahStepsOfNaldStarters.filter((starter: string) => starter === 'Main Story').length;
    let uldahStepsOfNaldClassStarters: number = 
    uldahStepsOfNaldStarters.filter((starter: string) => starter === 'Class').length;
    let uldahStepsOfNaldSideStarters: number = 
    uldahStepsOfNaldStarters.filter((starter: string) => starter === 'Side').length;
    let uldahStepsOfNaldHuntingLogStarters: number = 
    uldahStepsOfNaldStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let uldahStepsOfThalMainStoryStarters: number = 
    uldahStepsOfThalStarters.filter((starter: string) => starter === 'Main Story').length;
    let uldahStepsOfThalClassStarters: number = 
    uldahStepsOfThalStarters.filter((starter: string) => starter === 'Class').length;
    let uldahStepsOfThalSideStarters: number = 
    uldahStepsOfThalStarters.filter((starter: string) => starter === 'Side').length;
    let uldahStepsOfThalHuntingLogStarters: number = 
    uldahStepsOfThalStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let hustingsStripMainStoryStarters: number = 
    hustingsStripStarters.filter((starter: string) => starter === 'Main Story').length;
    let hustingsStripClassStarters: number = 
    hustingsStripStarters.filter((starter: string) => starter === 'Class').length;
    let hustingsStripSideStarters: number = 
    hustingsStripStarters.filter((starter: string) => starter === 'Side').length;
    let hustingsStripHuntingLogStarters: number = 
    hustingsStripStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let westernThanalanMainStoryStarters: number = 
    westernThanalanStarters.filter((starter: string) => starter === 'Main Story').length;
    let westernThanalanClassStarters: number = 
    westernThanalanStarters.filter((starter: string) => starter === 'Class').length;
    let westernThanalanSideStarters: number = 
    westernThanalanStarters.filter((starter: string) => starter === 'Side').length;
    let westernThanalanHuntingLogStarters: number = 
    westernThanalanStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let easternThanalanMainStoryStarters: number = 
    easternThanalanStarters.filter((starter: string) => starter === 'Main Story').length;
    let easternThanalanClassStarters: number = 
    easternThanalanStarters.filter((starter: string) => starter === 'Class').length;
    let easternThanalanSideStarters: number = 
    easternThanalanStarters.filter((starter: string) => starter === 'Side').length;
    let easternThanalanHuntingLogStarters: number = 
    easternThanalanStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let centralThanalanMainStoryStarters: number = 
    centralThanalanStarters.filter((starter: string) => starter === 'Main Story').length;
    let centralThanalanClassStarters: number = 
    centralThanalanStarters.filter((starter: string) => starter === 'Class').length;
    let centralThanalanSideStarters: number = 
    centralThanalanStarters.filter((starter: string) => starter === 'Side').length;
    let centralThanalanHuntingLogStarters: number = 
    centralThanalanStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let southernThanalanMainStoryStarters: number = 
    southernThanalanStarters.filter((starter: string) => starter === 'Main Story').length;
    let southernThanalanClassStarters: number = 
    southernThanalanStarters.filter((starter: string) => starter === 'Class').length;
    let southernThanalanSideStarters: number = 
    southernThanalanStarters.filter((starter: string) => starter === 'Side').length;
    let southernThanalanHuntingLogStarters: number = 
    southernThanalanStarters.filter((starter: string) => starter === 'Hunting Log').length;
    let northernThanalanMainStoryStarters: number = 
    northernThanalanStarters.filter((starter: string) => starter === 'Main Story').length;
    let northernThanalanClassStarters: number = 
    northernThanalanStarters.filter((starter: string) => starter === 'Class').length;
    let northernThanalanSideStarters: number = 
    northernThanalanStarters.filter((starter: string) => starter === 'Side').length;
    let northernThanalanHuntingLogStarters: number = 
    northernThanalanStarters.filter((starter: string) => starter === 'Hunting Log').length;
    
    const setLegendDetails = () => {
        zones.map((zone: string) => {
            let zoneName = zone.split(' ').join('');
            let zoneLink = zone.split(' ').join('-');
            let legendOverlayPos: number[] = [];
            let highlightedMapSize: number[] = [];
            let highlightedMapPos: number[] = [];
            let arrowIcon: string = '';
            let arrowSize: number[] = [];
            let arrowPos: number[] = [];
            let mainStoryNumberIcon: string = '';
            let classNumberIcon: string = '';
            let sideNumberIcon: string = '';
            let huntingLogNumberIcon: string = '';
            if (zone === 'Limsa Lominsa Lower Decks') {
                legendOverlayPos = [laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.legendPos[0], 
                laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.highlightSize[0], 
                laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.highlightPos[0], 
                laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.arrowSize[0],
                laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.arrowPos[0], 
                laNosceaMapAttributes.limsaLominsaLowerDecksAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${limsaLominsaLowerDecksMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${limsaLominsaLowerDecksClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${limsaLominsaLowerDecksSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${limsaLominsaLowerDecksHuntingLogStarters}.png`;
            } else if (zone === 'Limsa Lominsa Upper Decks') {
                legendOverlayPos = [laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.legendPos[0], 
                laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.highlightSize[0], 
                laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.highlightPos[0], 
                laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.arrowSize[0],
                laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.arrowPos[0], 
                laNosceaMapAttributes.limsaLominsaUpperDecksAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${limsaLominsaUpperDecksMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${limsaLominsaUpperDecksClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${limsaLominsaUpperDecksSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${limsaLominsaUpperDecksHuntingLogStarters}.png`;
            } else if (zone === 'Middle La Noscea') {
                legendOverlayPos = [laNosceaMapAttributes.middleLaNosceaAttributes.legendPos[0], 
                laNosceaMapAttributes.middleLaNosceaAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.middleLaNosceaAttributes.highlightSize[0], 
                laNosceaMapAttributes.middleLaNosceaAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.middleLaNosceaAttributes.highlightPos[0], 
                laNosceaMapAttributes.middleLaNosceaAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.middleLaNosceaAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.middleLaNosceaAttributes.arrowSize[0],
                laNosceaMapAttributes.middleLaNosceaAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.middleLaNosceaAttributes.arrowPos[0], 
                laNosceaMapAttributes.middleLaNosceaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${middleLaNosceaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${middleLaNosceaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${middleLaNosceaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${middleLaNosceaHuntingLogStarters}.png`;
            } else if (zone === 'Lower La Noscea') {
                legendOverlayPos = [laNosceaMapAttributes.lowerLaNosceaAttributes.legendPos[0], 
                laNosceaMapAttributes.lowerLaNosceaAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.lowerLaNosceaAttributes.highlightSize[0], 
                laNosceaMapAttributes.lowerLaNosceaAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.lowerLaNosceaAttributes.highlightPos[0], 
                laNosceaMapAttributes.lowerLaNosceaAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.lowerLaNosceaAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.lowerLaNosceaAttributes.arrowSize[0],
                laNosceaMapAttributes.lowerLaNosceaAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.lowerLaNosceaAttributes.arrowPos[0], 
                laNosceaMapAttributes.lowerLaNosceaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${lowerLaNosceaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${lowerLaNosceaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${lowerLaNosceaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${lowerLaNosceaHuntingLogStarters}.png`;
            } else if (zone === 'Eastern La Noscea') {
                legendOverlayPos = [laNosceaMapAttributes.easternLaNosceaAttributes.legendPos[0], 
                laNosceaMapAttributes.easternLaNosceaAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.easternLaNosceaAttributes.highlightSize[0], 
                laNosceaMapAttributes.easternLaNosceaAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.easternLaNosceaAttributes.highlightPos[0], 
                laNosceaMapAttributes.easternLaNosceaAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.easternLaNosceaAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.easternLaNosceaAttributes.arrowSize[0],
                laNosceaMapAttributes.easternLaNosceaAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.easternLaNosceaAttributes.arrowPos[0], 
                laNosceaMapAttributes.easternLaNosceaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${easternLaNosceaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${easternLaNosceaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${easternLaNosceaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${easternLaNosceaHuntingLogStarters}.png`;
            } else if (zone === 'Western La Noscea') {
                legendOverlayPos = [laNosceaMapAttributes.westernLaNosceaAttributes.legendPos[0], 
                laNosceaMapAttributes.westernLaNosceaAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.westernLaNosceaAttributes.highlightSize[0], 
                laNosceaMapAttributes.westernLaNosceaAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.westernLaNosceaAttributes.highlightPos[0], 
                laNosceaMapAttributes.westernLaNosceaAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.westernLaNosceaAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.westernLaNosceaAttributes.arrowSize[0],
                laNosceaMapAttributes.westernLaNosceaAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.westernLaNosceaAttributes.arrowPos[0], 
                laNosceaMapAttributes.westernLaNosceaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${westernLaNosceaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${westernLaNosceaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${westernLaNosceaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${westernLaNosceaHuntingLogStarters}.png`;
            } else if (zone === 'Upper La Noscea') {
                legendOverlayPos = [laNosceaMapAttributes.upperLaNosceaAttributes.legendPos[0], 
                laNosceaMapAttributes.upperLaNosceaAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.upperLaNosceaAttributes.highlightSize[0], 
                laNosceaMapAttributes.upperLaNosceaAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.upperLaNosceaAttributes.highlightPos[0], 
                laNosceaMapAttributes.upperLaNosceaAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.upperLaNosceaAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.upperLaNosceaAttributes.arrowSize[0],
                laNosceaMapAttributes.upperLaNosceaAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.upperLaNosceaAttributes.arrowPos[0], 
                laNosceaMapAttributes.upperLaNosceaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${upperLaNosceaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${upperLaNosceaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${upperLaNosceaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${upperLaNosceaHuntingLogStarters}.png`;
            } else if (zone === 'Outer La Noscea') {
                legendOverlayPos = [laNosceaMapAttributes.outerLaNosceaAttributes.legendPos[0], 
                laNosceaMapAttributes.outerLaNosceaAttributes.legendPos[1]];
                highlightedMapSize = [laNosceaMapAttributes.outerLaNosceaAttributes.highlightSize[0], 
                laNosceaMapAttributes.outerLaNosceaAttributes.highlightSize[1]];
                highlightedMapPos = [laNosceaMapAttributes.outerLaNosceaAttributes.highlightPos[0], 
                laNosceaMapAttributes.outerLaNosceaAttributes.highlightPos[1]];
                arrowIcon = laNosceaMapAttributes.outerLaNosceaAttributes.arrowIcon;
                arrowSize = [laNosceaMapAttributes.outerLaNosceaAttributes.arrowSize[0],
                laNosceaMapAttributes.outerLaNosceaAttributes.arrowSize[0]];
                arrowPos = [laNosceaMapAttributes.outerLaNosceaAttributes.arrowPos[0], 
                laNosceaMapAttributes.outerLaNosceaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${outerLaNosceaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${outerLaNosceaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${outerLaNosceaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${outerLaNosceaHuntingLogStarters}.png`;
            } else if (zone === 'New Gridania') {
                legendOverlayPos = [theBlackShroudMapAttributes.newGridaniaAttributes.legendPos[0], 
                theBlackShroudMapAttributes.newGridaniaAttributes.legendPos[1]];
                highlightedMapSize = [theBlackShroudMapAttributes.newGridaniaAttributes.highlightSize[0], 
                theBlackShroudMapAttributes.newGridaniaAttributes.highlightSize[1]];
                highlightedMapPos = [theBlackShroudMapAttributes.newGridaniaAttributes.highlightPos[0], 
                theBlackShroudMapAttributes.newGridaniaAttributes.highlightPos[1]];
                arrowIcon = theBlackShroudMapAttributes.newGridaniaAttributes.arrowIcon;
                arrowSize = [theBlackShroudMapAttributes.newGridaniaAttributes.arrowSize[0],
                theBlackShroudMapAttributes.newGridaniaAttributes.arrowSize[0]];
                arrowPos = [theBlackShroudMapAttributes.newGridaniaAttributes.arrowPos[0], 
                theBlackShroudMapAttributes.newGridaniaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${newGridaniaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${newGridaniaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${newGridaniaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${newGridaniaHuntingLogStarters}.png`;
            } else if (zone === 'Old Gridania') {
                legendOverlayPos = [theBlackShroudMapAttributes.oldGridaniaAttributes.legendPos[0], 
                theBlackShroudMapAttributes.oldGridaniaAttributes.legendPos[1]];
                highlightedMapSize = [theBlackShroudMapAttributes.oldGridaniaAttributes.highlightSize[0], 
                theBlackShroudMapAttributes.oldGridaniaAttributes.highlightSize[1]];
                highlightedMapPos = [theBlackShroudMapAttributes.oldGridaniaAttributes.highlightPos[0], 
                theBlackShroudMapAttributes.oldGridaniaAttributes.highlightPos[1]];
                arrowIcon = theBlackShroudMapAttributes.oldGridaniaAttributes.arrowIcon;
                arrowSize = [theBlackShroudMapAttributes.oldGridaniaAttributes.arrowSize[0],
                theBlackShroudMapAttributes.oldGridaniaAttributes.arrowSize[0]];
                arrowPos = [theBlackShroudMapAttributes.oldGridaniaAttributes.arrowPos[0], 
                theBlackShroudMapAttributes.oldGridaniaAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${oldGridaniaMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${oldGridaniaClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${oldGridaniaSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${oldGridaniaHuntingLogStarters}.png`;
            } else if (zone === 'Central Shroud') {
                legendOverlayPos = [theBlackShroudMapAttributes.centralShroudAttributes.legendPos[0], 
                theBlackShroudMapAttributes.centralShroudAttributes.legendPos[1]];
                highlightedMapSize = [theBlackShroudMapAttributes.centralShroudAttributes.highlightSize[0], 
                theBlackShroudMapAttributes.centralShroudAttributes.highlightSize[1]];
                highlightedMapPos = [theBlackShroudMapAttributes.centralShroudAttributes.highlightPos[0], 
                theBlackShroudMapAttributes.centralShroudAttributes.highlightPos[1]];
                arrowIcon = theBlackShroudMapAttributes.centralShroudAttributes.arrowIcon;
                arrowSize = [theBlackShroudMapAttributes.centralShroudAttributes.arrowSize[0],
                theBlackShroudMapAttributes.centralShroudAttributes.arrowSize[0]];
                arrowPos = [theBlackShroudMapAttributes.centralShroudAttributes.arrowPos[0], 
                theBlackShroudMapAttributes.centralShroudAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${centralShroudMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${centralShroudClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${centralShroudSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${centralShroudHuntingLogStarters}.png`;
            } else if (zone === 'East Shroud') {
                legendOverlayPos = [theBlackShroudMapAttributes.eastShroudAttributes.legendPos[0], 
                theBlackShroudMapAttributes.eastShroudAttributes.legendPos[1]];
                highlightedMapSize = [theBlackShroudMapAttributes.eastShroudAttributes.highlightSize[0], 
                theBlackShroudMapAttributes.eastShroudAttributes.highlightSize[1]];
                highlightedMapPos = [theBlackShroudMapAttributes.eastShroudAttributes.highlightPos[0], 
                theBlackShroudMapAttributes.eastShroudAttributes.highlightPos[1]];
                arrowIcon = theBlackShroudMapAttributes.eastShroudAttributes.arrowIcon;
                arrowSize = [theBlackShroudMapAttributes.eastShroudAttributes.arrowSize[0],
                theBlackShroudMapAttributes.eastShroudAttributes.arrowSize[0]];
                arrowPos = [theBlackShroudMapAttributes.eastShroudAttributes.arrowPos[0], 
                theBlackShroudMapAttributes.eastShroudAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${eastShroudMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${eastShroudClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${eastShroudSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${eastShroudHuntingLogStarters}.png`;
            } else if (zone === 'South Shroud') {
                legendOverlayPos = [theBlackShroudMapAttributes.southShroudAttributes.legendPos[0], 
                theBlackShroudMapAttributes.southShroudAttributes.legendPos[1]];
                highlightedMapSize = [theBlackShroudMapAttributes.southShroudAttributes.highlightSize[0], 
                theBlackShroudMapAttributes.southShroudAttributes.highlightSize[1]];
                highlightedMapPos = [theBlackShroudMapAttributes.southShroudAttributes.highlightPos[0], 
                theBlackShroudMapAttributes.southShroudAttributes.highlightPos[1]];
                arrowIcon = theBlackShroudMapAttributes.southShroudAttributes.arrowIcon;
                arrowSize = [theBlackShroudMapAttributes.southShroudAttributes.arrowSize[0],
                theBlackShroudMapAttributes.southShroudAttributes.arrowSize[0]];
                arrowPos = [theBlackShroudMapAttributes.southShroudAttributes.arrowPos[0], 
                theBlackShroudMapAttributes.southShroudAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${southShroudMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${southShroudClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${southShroudSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${southShroudHuntingLogStarters}.png`;
            } else if (zone === 'North Shroud') {
                legendOverlayPos = [theBlackShroudMapAttributes.northShroudAttributes.legendPos[0], 
                theBlackShroudMapAttributes.northShroudAttributes.legendPos[1]];
                highlightedMapSize = [theBlackShroudMapAttributes.northShroudAttributes.highlightSize[0], 
                theBlackShroudMapAttributes.northShroudAttributes.highlightSize[1]];
                highlightedMapPos = [theBlackShroudMapAttributes.northShroudAttributes.highlightPos[0], 
                theBlackShroudMapAttributes.northShroudAttributes.highlightPos[1]];
                arrowIcon = theBlackShroudMapAttributes.northShroudAttributes.arrowIcon;
                arrowSize = [theBlackShroudMapAttributes.northShroudAttributes.arrowSize[0],
                theBlackShroudMapAttributes.northShroudAttributes.arrowSize[0]];
                arrowPos = [theBlackShroudMapAttributes.northShroudAttributes.arrowPos[0], 
                theBlackShroudMapAttributes.northShroudAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${northShroudMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${northShroudClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${northShroudSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${northShroudHuntingLogStarters}.png`;
            } else if (zone === `Ul'dah - Steps of Nald`) {
                legendOverlayPos = [thanalanMapAttributes.uldahStepsOfNaldAttributes.legendPos[0], 
                thanalanMapAttributes.uldahStepsOfNaldAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.uldahStepsOfNaldAttributes.highlightSize[0], 
                thanalanMapAttributes.uldahStepsOfNaldAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.uldahStepsOfNaldAttributes.highlightPos[0], 
                thanalanMapAttributes.uldahStepsOfNaldAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.uldahStepsOfNaldAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.uldahStepsOfNaldAttributes.arrowSize[0],
                thanalanMapAttributes.uldahStepsOfNaldAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.uldahStepsOfNaldAttributes.arrowPos[0], 
                thanalanMapAttributes.uldahStepsOfNaldAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${uldahStepsOfNaldMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${uldahStepsOfNaldClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${uldahStepsOfNaldSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${uldahStepsOfNaldHuntingLogStarters}.png`;
            } else if (zone === `Ul'dah - Steps of Thal`) {
                legendOverlayPos = [thanalanMapAttributes.uldahStepsOfThalAttributes.legendPos[0], 
                thanalanMapAttributes.uldahStepsOfThalAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.uldahStepsOfThalAttributes.highlightSize[0], 
                thanalanMapAttributes.uldahStepsOfThalAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.uldahStepsOfThalAttributes.highlightPos[0], 
                thanalanMapAttributes.uldahStepsOfThalAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.uldahStepsOfThalAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.uldahStepsOfThalAttributes.arrowSize[0],
                thanalanMapAttributes.uldahStepsOfThalAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.uldahStepsOfThalAttributes.arrowPos[0], 
                thanalanMapAttributes.uldahStepsOfThalAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${uldahStepsOfThalMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${uldahStepsOfThalClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${uldahStepsOfThalSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${uldahStepsOfThalHuntingLogStarters}.png`;
            } else if (zone === 'Hustings Strip') {
                legendOverlayPos = [thanalanMapAttributes.hustingsStripAttributes.legendPos[0], 
                thanalanMapAttributes.hustingsStripAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.hustingsStripAttributes.highlightSize[0], 
                thanalanMapAttributes.hustingsStripAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.hustingsStripAttributes.highlightPos[0], 
                thanalanMapAttributes.hustingsStripAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.hustingsStripAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.hustingsStripAttributes.arrowSize[0],
                thanalanMapAttributes.hustingsStripAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.hustingsStripAttributes.arrowPos[0], 
                thanalanMapAttributes.hustingsStripAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${hustingsStripMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${hustingsStripClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${hustingsStripSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${hustingsStripHuntingLogStarters}.png`;
            } else if (zone === 'Western Thanalan') {
                legendOverlayPos = [thanalanMapAttributes.westernThanalanAttributes.legendPos[0], 
                thanalanMapAttributes.westernThanalanAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.westernThanalanAttributes.highlightSize[0], 
                thanalanMapAttributes.westernThanalanAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.westernThanalanAttributes.highlightPos[0], 
                thanalanMapAttributes.westernThanalanAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.westernThanalanAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.westernThanalanAttributes.arrowSize[0],
                thanalanMapAttributes.westernThanalanAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.westernThanalanAttributes.arrowPos[0], 
                thanalanMapAttributes.westernThanalanAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${westernThanalanMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${westernThanalanClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${westernThanalanSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${westernThanalanHuntingLogStarters}.png`;
            } else if (zone === 'Eastern Thanalan') {
                legendOverlayPos = [thanalanMapAttributes.easternThanalanAttributes.legendPos[0], 
                thanalanMapAttributes.easternThanalanAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.easternThanalanAttributes.highlightSize[0], 
                thanalanMapAttributes.easternThanalanAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.easternThanalanAttributes.highlightPos[0], 
                thanalanMapAttributes.easternThanalanAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.easternThanalanAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.easternThanalanAttributes.arrowSize[0],
                thanalanMapAttributes.easternThanalanAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.easternThanalanAttributes.arrowPos[0], 
                thanalanMapAttributes.easternThanalanAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${easternThanalanMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${easternThanalanClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${easternThanalanSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${easternThanalanHuntingLogStarters}.png`;
            } else if (zone === 'Central Thanalan') {
                legendOverlayPos = [thanalanMapAttributes.centralThanalanAttributes.legendPos[0], 
                thanalanMapAttributes.centralThanalanAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.centralThanalanAttributes.highlightSize[0], 
                thanalanMapAttributes.centralThanalanAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.centralThanalanAttributes.highlightPos[0], 
                thanalanMapAttributes.centralThanalanAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.centralThanalanAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.centralThanalanAttributes.arrowSize[0],
                thanalanMapAttributes.centralThanalanAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.centralThanalanAttributes.arrowPos[0], 
                thanalanMapAttributes.centralThanalanAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${centralThanalanMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${centralThanalanClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${centralThanalanSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${centralThanalanHuntingLogStarters}.png`;
            } else if (zone === 'Southern Thanalan') {
                legendOverlayPos = [thanalanMapAttributes.southernThanalanAttributes.legendPos[0], 
                thanalanMapAttributes.southernThanalanAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.southernThanalanAttributes.highlightSize[0], 
                thanalanMapAttributes.southernThanalanAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.southernThanalanAttributes.highlightPos[0], 
                thanalanMapAttributes.southernThanalanAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.southernThanalanAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.southernThanalanAttributes.arrowSize[0],
                thanalanMapAttributes.southernThanalanAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.southernThanalanAttributes.arrowPos[0], 
                thanalanMapAttributes.southernThanalanAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${southernThanalanMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${southernThanalanClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${southernThanalanSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${southernThanalanHuntingLogStarters}.png`;
            } else if (zone === 'Northern Thanalan') {
                legendOverlayPos = [thanalanMapAttributes.northernThanalanAttributes.legendPos[0], 
                thanalanMapAttributes.northernThanalanAttributes.legendPos[1]];
                highlightedMapSize = [thanalanMapAttributes.northernThanalanAttributes.highlightSize[0], 
                thanalanMapAttributes.northernThanalanAttributes.highlightSize[1]];
                highlightedMapPos = [thanalanMapAttributes.northernThanalanAttributes.highlightPos[0], 
                thanalanMapAttributes.northernThanalanAttributes.highlightPos[1]];
                arrowIcon = thanalanMapAttributes.northernThanalanAttributes.arrowIcon;
                arrowSize = [thanalanMapAttributes.northernThanalanAttributes.arrowSize[0],
                thanalanMapAttributes.northernThanalanAttributes.arrowSize[0]];
                arrowPos = [thanalanMapAttributes.northernThanalanAttributes.arrowPos[0], 
                thanalanMapAttributes.northernThanalanAttributes.arrowPos[1]];
                mainStoryNumberIcon = `/icons/quest_numbers/${northernThanalanMainStoryStarters}.png`;
                classNumberIcon = `/icons/quest_numbers/${northernThanalanClassStarters}.png`;
                sideNumberIcon = `/icons/quest_numbers/${northernThanalanSideStarters}.png`;
                huntingLogNumberIcon = `/icons/quest_numbers/${northernThanalanHuntingLogStarters}.png`;
            }
            let hoverOverlayObject: TypeHoverOverlay | undefined = {
                map: zone,
                mapNameIcon: {
                    mapNameIconUrl: `/icons/zone_names/${zoneName}.png`,
                    mapNameIconPos: [-7.4, 21.5],
                    mapNameIconSize: [205.7, 34.85],
                },
                highlightedMapIcon: {
                    highlightedMapIconUrl: `/highlighted_maps/${zoneName}Highlighted.jpg`,
                    highlightedMapIconPos: highlightedMapPos,
                    highlightedMapIconSize: highlightedMapSize ,
                },
                legendOverlayIcon: {
                    legendOverlayIconUrl: '/icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png',
                    legendOverlayIconPos: legendOverlayPos,
                    legendOverlayIconSize: legendAttributes.legendSize,
                },
                mapLinkUrl: zoneLink,
            }
            hoverOverlayDetails.push(hoverOverlayObject);
            let legendObject: TypeLegend | undefined = {
                legendIcon: {
                    legendIconUrl: `/icons/quest_legend_icons/QuestTotalsBox.png`,
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
        <div id='map'>
            <MapWithNoSSR />
        </div>
    </div>;
}

export default Region;
