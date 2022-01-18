import React from 'react';
import { Route, Switch } from 'react-router';
import QuestContainer from './containers/QuestContainer';
import Home from './components/home/Home';

const routes = (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/quests' component={QuestContainer} />
        </Switch>
    </div>
);

export default routes;