import React from 'react';
import dynamic from 'next/dynamic';

type ZoneProps = {
   zoneName?: string;
}

export default function Zone({ zoneName }: ZoneProps) {

    const MapWithNoSSR = dynamic(() => import('../../components/ZoneMap'), { ssr: false });

    return <div>
        <div id='map'>
            <MapWithNoSSR zoneName={zoneName}/>
        </div>
    </div>;
}