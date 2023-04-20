import { useRouter } from 'next/router';
import { TypeNpc, TypeQuest, TypeQuestDetail, TypeStep } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { getNpcsState, getActiveQuestsState, getQuestIconBgColorsState, getStepsState, updateQuestDetails} from '@/store/slices/dataStoreSlice';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ZoneMap = () => {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let zoneName: string = splitPathName.split('-').filter((word: string) => word !== '-').join(' ');
    let npcs: TypeNpc[] = useSelector(getNpcsState).filter((npc: TypeNpc) => npc.npc_zone.includes(zoneName) && 
    npc.npc_type !== 'Aetheryte' && npc.npc_type !== 'Delivery Moogle' && !npc.npc_name.includes('Chocobokeep'));
    let npcIds: number[] = npcs.map((n: TypeNpc) => n.id);
    let activeQuests: TypeQuest[] = useSelector(getActiveQuestsState);
    let activeInZoneQuests: TypeQuest[] = [];
    let questColors: string[] = useSelector(getQuestIconBgColorsState);
    let colorIndex: number = 0;
    let questDetailArray: TypeQuestDetail[] = [];
    let steps: TypeStep[] = useSelector(getStepsState);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateQuestDetails({questDetailsArray: questDetailArray}));
    }, [questDetailArray])

    const MapWithNoSSR = dynamic(() => import('../../components/ZoneMap'), { ssr: false });

    activeQuests.map((aq: TypeQuest) => {
        aq.quest_npcs.map(npc => {
            if (npcIds.includes(npc) && !activeInZoneQuests.includes(aq)) {
                activeInZoneQuests.push(aq);
            }
        })
    })

    activeInZoneQuests.map((activeQuest: TypeQuest) => {
        let stepIndex = 0;
        let questDetailObject: TypeQuestDetail | undefined = {
            quest: activeQuest,
            questBgColor: '',
            stepContainerIcon: '',
            activeStepContainerIcon: '',
            questBgColorIcon: '',
            questTypeIcon: '',
            activeQuestTypeIcon: '',
            questSteps: [],
        };

        if (questDetailObject) {
            questDetailObject.questBgColor = questColors[colorIndex];
            questDetailObject.stepContainerIcon = `/icons/first_layer/IconContainer.png`;
            questDetailObject.activeStepContainerIcon = `/icons/first_layer/IconContainerActive.png`;
            questDetailObject.questBgColorIcon = `/icons/second_layer/${questColors[colorIndex]}Bg.png`;
            questDetailObject.questTypeIcon = `/icons/fourth_layer/${activeQuest.quest_type.split(' ').join('')}QuestIcon.png`;
            questDetailObject.activeQuestTypeIcon = 
            `/icons/fourth_layer/${activeQuest.quest_type.split(' ').join('')}QuestIconActive.png`;

            activeQuest.quest_npcs.map((questNpc: number) => {
                let stepIcon = '';
                let activeStepIcon = ''
                let npcLocX = npcs.find((npc: TypeNpc) => npc.id === questNpc)?.npc_location_x;
                let npcLocY = npcs.find((npc: TypeNpc) => npc.id === questNpc)?.npc_location_y;
                let npcName = npcs.find((npc: TypeNpc) => npc.id === questNpc)?.npc_name;
                let stepDescription = steps.find((step: TypeStep) => step.step_npc === questNpc)?.step_description;
                if (npcLocY && npcLocX && stepDescription && npcName) {
                    let npcPosition = [-parseFloat(npcLocY), parseFloat(npcLocX)];
                    if (stepIndex === 0) {
                        stepIcon = `/icons/third_layer/StartIcon.png`;
                        activeStepIcon = `/icons/third_layer/StartIconActive.png`;
                    } else if (stepIndex > 0 && stepIndex < (activeQuest.quest_npcs.length - 1)) {
                        stepIcon = `/icons/third_layer/Step${stepIndex}Icon.png`;
                        activeStepIcon = `/icons/third_layer/Step${stepIndex}IconActive.png`;
                    } else {
                        stepIcon = `/icons/third_layer/TurnInIcon.png`;
                        activeStepIcon = `/icons/third_layer/TurnInIconActive.png`;
                    }
                    let questStepObject = {
                        stepIcon: stepIcon,
                        activeStepIcon: activeStepIcon,
                        npcPosition: npcPosition,
                        tooltipDetails: {
                            npcName: npcName,
                            questName: activeQuest.quest_name,
                            stepDescription: stepDescription,
                        }
                    }
                    questDetailObject?.questSteps.push(questStepObject);
                    stepIndex++;
                }
            })
                  
        if (colorIndex < questColors.length - 1) {
            colorIndex ++;
        } else {
            colorIndex = 0;
        }

        if (questDetailObject) {
            questDetailArray.push(questDetailObject);
        }
    }})
    return <div>
        <div id='map'>
            <MapWithNoSSR />
        </div>
    </div>;
}

export default ZoneMap;