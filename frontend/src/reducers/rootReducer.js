import { combineReducers } from 'redux';
import npcReducer from './npcReducer';
import questReducer from './questReducer';

const rootReducer = () => 
    combineReducers({
        quests: questReducer,
        npcs: npcReducer,
    })

export default rootReducer;