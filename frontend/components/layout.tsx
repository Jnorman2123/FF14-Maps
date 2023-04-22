import NavBar from './navBar';
import QuestInfoContainer from './questInfoContainer';
import ToggleContainer from './toggleContainer';
import type { TypeQuest, TypeReward, TypeNpc, TypeItem,  TypeJob, TypeStep } from "../types";
import { useGetQuestsQuery, useGetRewardsQuery, useGetItemsQuery, useGetJobsQuery, useGetNpcsQuery, 
useGetStepsQuery } from "@/store/services/helperquest";
import { updateQuests, updateItems, updateJobs, updateNpcs, updateRewards, updateSteps } from '@/store/slices/dataStoreSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateQuests({questArray: quests}));
        dispatch(updateJobs({jobArray: jobs}));
        dispatch(updateItems({itemArray: items}));
        dispatch(updateNpcs({npcArray: npcs}));
        dispatch(updateRewards({rewardArray: rewards}));
        dispatch(updateSteps({stepArray: steps}));
    }, [quests, jobs, rewards, npcs, items, steps]);

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
    
    return (
        <div className='space-y-borderspace'>
            <NavBar />
            <div className='grid grid-cols-12 gap-2 h-screen'>
                <ToggleContainer />
                <main  className='col-span-6 h-main'>{children} </main>
                <QuestInfoContainer />
            </div>
        </div>
    )
}