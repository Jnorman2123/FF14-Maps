import { TypeNpc, TypeQuest, TypeQuestDetail, TypeStep } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { getNpcsState, getActiveQuestsState, getQuestIconBgColorsState, getStepsState, updateQuestDetails} from '@/store/slices/dataStoreSlice';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ZoneMap = () => {
    let npcs: TypeNpc[] = useSelector(getNpcsState).filter((npc: TypeNpc) => npc.npc_type !== 'Aetheryte' && 
    npc.npc_type !== 'Delivery Moogle' && !npc.npc_name.includes('Chocobokeep'));
    let activeQuests: TypeQuest[] = useSelector(getActiveQuestsState);
    let questColors: string[] = useSelector(getQuestIconBgColorsState);
    let colorIndex: number = 0;
    let questDetailArray: TypeQuestDetail[] = [];
    let steps: TypeStep[] = useSelector(getStepsState);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateQuestDetails({questDetailsArray: questDetailArray}));
    }, [questDetailArray])

    const MapWithNoSSR = dynamic(() => import('../../components/ZoneMap'), { ssr: false });

    activeQuests.map((activeQuest: TypeQuest) => {
        let stepIndex = 0;
        let questSteps = steps.filter((step: TypeStep) => step.quest_step === activeQuest.id);
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

            questSteps.map((step: TypeStep) => {
                let stepIcon = '';
                let activeStepIcon = ''
                let npc = npcs.find((npc: TypeNpc) => npc.id === step.step_npc);
                let npcLocX = npc?.npc_location_x;
                let npcLocY = npc?.npc_location_y;
                let npcName = npc?.npc_name;
                let npcZone = npc?.npc_zone;
                let stepDescription = step.step_description;
                if (npcLocY && npcLocX && stepDescription && npcName && npcZone) {
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
                        npcZone: npcZone,
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