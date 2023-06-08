import NavBar from './navBar';
import QuestInfoContainer from './questInfoContainer';
import ToggleContainer from './toggleContainer';
import type { TypeQuest, TypeReward, TypeNpc, TypeItem,  TypeJob, TypeStep, TypeQuestDetail } from "../types";
import { updateQuests, updateItems, updateJobs, updateNpcs, updateRewards, updateSteps, getActiveQuestsState, 
getQuestIconBgColorsState, updateQuestDetails } from '@/store/slices/dataStoreSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetQuests } from '@/custom_hooks/useGetQuests';
import { useGetJobs } from '@/custom_hooks/useGetJobs';
import { useGetNpcs } from '@/custom_hooks/useGetNpcs';
import { useGetRewards } from '@/custom_hooks/useGetRewards';
import { useGetSteps } from '@/custom_hooks/useGetSteps';
import { useGetItems } from '@/custom_hooks/useGetItems';
import { useRouter } from 'next/router';


type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    let quests: TypeQuest[] = useGetQuests();
    let jobs: TypeJob[] = useGetJobs();
    let rewards: TypeReward[] = useGetRewards();
    let npcs: TypeNpc[] = useGetNpcs();
    let items: TypeItem[] = useGetItems();
    let steps: TypeStep[] = useGetSteps();
    let filteredNpcs: TypeNpc[] = [];
    let activeQuests: TypeQuest[] = useSelector(getActiveQuestsState);
    let questColors: string[] = useSelector(getQuestIconBgColorsState);
    let colorIndex: number = 0;
    let questDetailArray: TypeQuestDetail[] = [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateQuests({questArray: quests}));
        dispatch(updateJobs({jobArray: jobs}));
        dispatch(updateItems({itemArray: items}));
        dispatch(updateNpcs({npcArray: npcs}));
        dispatch(updateRewards({rewardArray: rewards}));
        dispatch(updateSteps({stepArray: steps}));
    }, [quests, jobs, rewards, npcs, items, steps]);

    useEffect(() => {
        dispatch(updateQuestDetails({questDetailsArray: questDetailArray}));
    }, [questDetailArray]);
    
    filteredNpcs = npcs.filter((npc: TypeNpc) => npc.npc_type !== 'Aetheryte' && 
    npc.npc_type !== 'Delivery Moogle' && !npc.npc_name.includes('Chocobokeep'));
    
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
                let npc = filteredNpcs.find((npc: TypeNpc) => npc.id === step.step_npc);
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
    
    return (
        <div className='space-y-borderspace'>
            <NavBar />
            <div className='grid grid-cols-12 gap-1 h-screen'>
                <ToggleContainer />
                <main  className='col-span-6 h-main z-1'>{children} </main>
                <QuestInfoContainer />
            </div>
        </div>
    )
}