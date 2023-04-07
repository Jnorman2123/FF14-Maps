import NavBar from './navBar';
import QuestInfoContainer from './questInfoContainer';
import ToggleContainer from './toggleContainer';
import { cloneElement } from 'react';
import type { TypeQuest, TypeReward, TypeNpc, TypeItem,  TypeJob, TypeStep } from "../types";
import { useGetQuestsQuery, useGetRewardsQuery, useGetItemsQuery, useGetJobsQuery, useGetNpcsQuery, 
useGetStepsQuery } from "@/store/services/helperquest";

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
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