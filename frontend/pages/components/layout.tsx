import React, { PropsWithChildren } from 'react';
import WorldNav from '../containers/worldNav';
import QuestInfoContainer from '../containers/questInfoContainer';
import ToggleContainer from '../containers/toggleContainer';
import WorldMapContainer from '../containers/worldMapContainer';


const Layout = ({children}: PropsWithChildren) => {
    return (
        <>
            <WorldNav />
            <QuestInfoContainer title='Quest Info Container' />
            <ToggleContainer title='Toggle Container' />
            <main>{children}</main>
            <WorldMapContainer title='World Map Container' />
        </>
    )
}

export default Layout