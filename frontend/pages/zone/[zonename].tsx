import { useRouter } from 'next/router';
import { TypeNpc, TypeQuest, TypeStep } from '@/types';
import { useSelector } from 'react-redux';
import { getNpcsState, getActiveQuestsState, getStepsState, getQuestIconBgColorsState} from '@/store/slices/dataStoreSlice';

const ZoneMap = () => {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let zoneName: string = splitPathName.split('-').filter((word: string) => word !== '-').join(' ');
    let npcs: TypeNpc[] = useSelector(getNpcsState).filter((npc: TypeNpc) => npc.npc_zone.includes(zoneName) && 
    npc.npc_type !== 'Aetheryte' && npc.npc_type !== 'Delivery Moogle' && !npc.npc_name.includes('Chocobokeep'));
    let npcIds: number[] = npcs.map((n: TypeNpc) => n.id);
    let activeQuests: TypeQuest[] = useSelector(getActiveQuestsState);
    let steps: TypeStep[] = useSelector(getStepsState);
    let activeInZoneQuests: TypeQuest[] = [];
    let activeInZoneQuestIds: number[] = [];
    let questColors: string[] = useSelector(getQuestIconBgColorsState);
    let colorIndex: number = 0;

    activeQuests.map((aq: TypeQuest) => {
        aq.quest_npcs.map(npc => {
            if (npcIds.includes(npc) && !activeInZoneQuests.includes(aq)) {
                activeInZoneQuests.push(aq);
                activeInZoneQuestIds = activeInZoneQuests.map((quest: TypeQuest) => quest.id);
            }
        })
    })

    activeInZoneQuests.map((activeQuest: TypeQuest) => {
        console.log(activeQuest.quest_npcs);
        console.log(questColors[colorIndex]);
        console.log(`/icons/second_layer/${questColors[colorIndex]}Bg.png`);
        console.log(`/icons/fourth_layer/${activeQuest.quest_type.split(' ').join('')}QuestIcon.png`);
        if (npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[0]) !== undefined) {
            console.log(npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[0])?.npc_name);
            console.log(`/icons/cluster_icons/${activeQuest.quest_type.split(' ').join('')}StartIcon.png`);
            console.log(npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[0])?.npc_location_x);
            console.log(npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[0])?.npc_location_y);
        }
        if (activeQuest.quest_npcs.slice(1,-1).length > 0) {
            let stepIndex: number = 1;
            activeQuest.quest_npcs.slice(1,-1).map((questNpc: number) => {
                console.log(npcs.find((npc: TypeNpc) => npc.id === questNpc)?.npc_name);
                console.log(`/icons/third_layer/Step${stepIndex}Icon.png`);
                console.log(npcs.find((npc: TypeNpc) => npc.id === questNpc)?.npc_location_x);
                console.log(npcs.find((npc: TypeNpc) => npc.id === questNpc)?.npc_location_y);
                stepIndex ++;
            });
        }
        if (npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[activeQuest.quest_npcs.length - 1]) !== undefined) {
            console.log(npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[activeQuest.quest_npcs.length - 1])?.npc_name);
            console.log(`/icons/clusterIcons/${activeQuest.quest_type.split(' ').join('')}TurninIcon.png`);
            console.log(npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[activeQuest.quest_npcs.length - 1])?.npc_location_x);
            console.log(npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[activeQuest.quest_npcs.length - 1])?.npc_location_y);
        }
        if (colorIndex < questColors.length - 1) {
            colorIndex ++;
        } else {
            colorIndex = 0;
        }
    })
    

    console.log(npcs)
    console.log(activeQuests)
    console.log(activeInZoneQuests)
    

    return <div>
        <h1>Welcome to {zoneName} map!</h1>
        {npcs.map((npc: TypeNpc) => {
            let npcSteps: TypeStep[] = steps.filter((step: TypeStep) => 
            step.step_npc === npc.id && activeInZoneQuestIds.includes(step.quest_step));
            if (npcSteps.length > 0) {
                return npcSteps.map((step: TypeStep) => {
                    let stepQuest: TypeQuest | undefined;
                    if (stepQuest?.id !== null) {
                        stepQuest = activeInZoneQuests.find((quest: TypeQuest) => quest.id === step.quest_step)
                    }
                    if (stepQuest) {
                        return <div key={step.step_description}>
                            <h4>{npc.npc_name}</h4>
                            <h6>Quest Name: {stepQuest.quest_name}</h6>
                            <h6>Step Description: {step.step_description}</h6>
                            <div>---------------------------------------------</div>
                        </div>
                    }
                })
            }
        })}
    </div>;
}

export default ZoneMap;