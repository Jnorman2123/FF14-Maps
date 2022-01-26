import { combineReducers } from 'redux';
import npcReducer from './npcReducer';
import questReducer from './questReducer';
import itemReducer from './itemReducer';
import stepReducer from './stepReducer';

const rootReducer = () => 
    combineReducers({
        quests: questReducer,
        npcs: npcReducer,
        items: itemReducer,
        steps: stepReducer,
    })

export default rootReducer;