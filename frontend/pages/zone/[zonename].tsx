import React from 'react';
import dynamic from 'next/dynamic';

export default function Zone() {

    const MapWithNoSSR = dynamic(() => import('../../components/ZoneMap'), { ssr: false });

    return <div>
        <div id='map'>
            <MapWithNoSSR />
        </div>
    </div>;
}