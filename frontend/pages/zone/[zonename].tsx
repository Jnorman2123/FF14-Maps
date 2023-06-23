import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useSelector } from 'react-redux';
import { getItemsState, getJobsState, getNpcsState, getQuestsState, getRewardsState, 
    getStepsState } from '@/store/slices/dataStoreSlice';
import { TypeJob, TypeQuest, TypeNpc, TypeReward, TypeItem } from '@/types';

export default function Zone() {

    const MapWithNoSSR = dynamic(() => import('../../components/ZoneMap'), { ssr: false });
    const router = useRouter();
    const { asPath } = router;
    let questName: string = '';
    let zoneName: string = '';
    let npcs = useSelector(getNpcsState);
    let quests = useSelector(getQuestsState);
    let rewards = useSelector(getRewardsState);
    let steps = useSelector(getStepsState);
    let items = useSelector(getItemsState);
    let jobs = useSelector(getJobsState);
    let currentQuest: TypeQuest = {
        id: 0,
        quest_name: '',
        previous_quest: '',
        next_quest: '',
        quest_level: 0,
        quest_class: [],
        quest_npcs: [],
        quest_reward: 0,
        quest_type: ''
    };
    let currentQuestJobs: string[] = [];
    let currentQuestLevel: number = 0;
    let currentQuestType: string = '';
    let currentQuestNpcs: string[] = [];
    let currentQuestReward: TypeReward = {
        id: 0,
        reward_quest_name: '',
        reward_experience: 0,
        reward_gil: 0,
        reward_items: [],
        reward_other: ''
    };
    let rewardItems: string[] = [];
    let seoDescription: string = '';

    if (asPath.split('/')[1] === 'quest' && asPath.split('/').slice(-1)[0].split('+')[1]) {
        questName = asPath.split('/').slice(-1)[0].split('+')[1].split(/(?=[A-Z])/).join(' '); 
        zoneName = asPath.split('/').slice(-1)[0].split('+')[0].split(/(?=[A-Z])/).join(' ');
    } else if (asPath.split('/')[1] === 'zone') {
        zoneName = asPath.split('/').slice(-1)[0].split(/(?=[A-Z])/).join(' ');
        questName = '';
    } 

    currentQuest = quests.filter((quest: TypeQuest) => quest.quest_name === questName)[0];
    if (currentQuest) {
        currentQuestJobs = currentQuest.quest_class.map((questClass: number) => {
            return jobs.filter((job: TypeJob) => job.id === questClass)[0].job_name;
        });
        currentQuestLevel = currentQuest.quest_level;
        currentQuestType = currentQuest.quest_type;
        currentQuestNpcs = currentQuest.quest_npcs.map((questNpc: number) => {
            return npcs.filter((npc: TypeNpc) => npc.id === questNpc)[0].npc_name;
        });
        currentQuestReward = rewards.filter((reward: TypeReward) => reward.id === currentQuest.quest_reward)[0];
        rewardItems = currentQuestReward.reward_items.map((itemId: number) => {
            return items.filter((item: TypeItem) => item.id === itemId)[0].item_name;
        }).filter((rewardItem: string) => rewardItem !== 'None');
    };

    if (asPath.split('/')[1] === 'quest' && asPath.split('/').slice(-1)[0].split('+')[1]) {
        seoDescription = `Showing steps and zone for ${questName}, ${currentQuestJobs}, ${currentQuestNpcs}`;
    } else if (asPath.split('/')[1] === 'zone') {
        seoDescription = `Find locations for NPCs, quest steps, and turn-ins with this ${zoneName} map for Final Fantasy 14 Online. 
        Filter by level, class, and quest type.`;
    } 

    return <div>
        <NextSeo 
            title='Find quest info fast with our Final Fantasy 14 Online maps.' 
            description={seoDescription}
            openGraph={{
                url: `https://helperquest.com/zone/${zoneName.split(' ').join('')}`,
                title: `Find quest info on this map of ${zoneName}.`,
                description: 'Find quest info fast with our Final Fantasy 14 Online Maps.',
                images: [
                    {
                        url: '/icons/open_graph/HelperQuestOpenGraph.jpg',
                        width: 800,
                        height: 700,
                        alt: 'Open Graph HelperQuest image',
                        type: 'image/jpeg'
                    }
                ],
                siteName: 'HelperQuest',
            }} 
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
        />
        <div id='map'>
            <MapWithNoSSR />
        </div>
    </div>;
}