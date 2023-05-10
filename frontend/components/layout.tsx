import NavBar from './navBar';
import QuestInfoContainer from './questInfoContainer';
import ToggleContainer from './toggleContainer';
import type { TypeQuest, TypeReward, TypeNpc, TypeItem,  TypeJob, TypeStep, TypeQuestDetail } from "../types";
import { useGetQuestsQuery, useGetRewardsQuery, useGetItemsQuery, useGetJobsQuery, useGetNpcsQuery, 
useGetStepsQuery } from "@/store/services/helperquest";
import { updateQuests, updateItems, updateJobs, updateNpcs, updateRewards, updateSteps, 
getNpcsState, getActiveQuestsState, getQuestIconBgColorsState, getStepsState, 
updateQuestDetails } from '@/store/slices/dataStoreSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    let quests: TypeQuest[] = [];
    let jobs: TypeJob[] = [];
    let rewards: TypeReward[] = [];
    let npcs: TypeNpc[] = [];
    let items: TypeItem[] = [];
    let steps: TypeStep[] = [];
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

    const setQuests = () => {
        const { data, error, isLoading } = useGetQuestsQuery('quests');
        if (isLoading) {
        return quests = [];
        } else {
        return quests = data
        }
    }

    const setJobs = () => {
        const { data, error, isLoading } = useGetJobsQuery('jobs');
        if (isLoading) {
        return jobs = [];
        } else {
        return jobs = data
        }
    }

    const setRewards = () => {
        const { data, error, isLoading } = useGetRewardsQuery('rewards');
        if (isLoading) {
        return rewards = [];
        } else {
        return rewards = data
        }
    }

    const setNpcs = () => {
        const { data, error, isLoading } = useGetNpcsQuery('npcs');
        if (isLoading) {
        return npcs = [];
        } else {
        return npcs = data
        }
    }

    const setItems = () => {
        const { data, error, isLoading } = useGetItemsQuery('items');
        if (isLoading) {
        return items = [];
        } else {
        return items = data
        }
    }

    const setSteps = () => {
        const { data, error, isLoading } = useGetStepsQuery('steps');
        if (isLoading) {
        return steps = [];
        } else {
        return steps = data
        }
    }

    setQuests();
    setRewards();
    setJobs();
    setItems();
    setNpcs();
    setSteps();

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