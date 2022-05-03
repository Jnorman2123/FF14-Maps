import { combineReducers } from 'redux';
import npcReducer from './npcReducer';
import questReducer from './questReducer';
import itemReducer from './itemReducer';
import stepReducer from './stepReducer';
import rewardReducer from './rewardReducer';
import filterReducer from './filterReducer';
import jobReducer from './jobReducer';

const rootReducer = () => 
    combineReducers({
        quests: questReducer,
        npcs: npcReducer,
        items: itemReducer,
        steps: stepReducer,
        rewards: rewardReducer,
        jobs: jobReducer,
        storeData: filterReducer
    })

export default rootReducer;