import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Zone() {

    const MapWithNoSSR = dynamic(() => import('../../components/ZoneMap'), { ssr: false });
    const router = useRouter();
    const { asPath } = router;
    let questName: string;
    let zoneName: string;

    if (asPath.split('/')[1] === 'quest' && asPath.split('/').slice(-1)[0].split('+')[1]) {
        questName = asPath.split('/').slice(-1)[0].split('+')[1].split(/(?=[A-Z])/).join(' '); 
        zoneName = asPath.split('/').slice(-1)[0].split('+')[0].split(/(?=[A-Z])/).join(' ');
    } else if (asPath.split('/')[1] === 'zone') {
        zoneName = asPath.split('/').slice(-1)[0].split(/(?=[A-Z])/).join(' ');
        questName = '';
    } else {
        questName = '';
        zoneName = '';
    }

    if (questName === '') {
        return <div>
            <Head>
                <title>{zoneName}</title>
                <meta name={`Zone: ${zoneName}`} content={`HelperQuest FF14 quest info for ${zoneName}`}/>
            </Head>
            <div id='map'>
                <MapWithNoSSR />
            </div>
        </div>;
    } else {
        return <div>
            <Head>
                <title>{questName}</title>
                <meta name={`Zone: ${zoneName} Quest: ${questName}`} content={`HelperQuest FF14 quest info for ${questName}`}/>
            </Head>
            <div id='map'>
                <MapWithNoSSR />
            </div>
        </div>;
    }
}