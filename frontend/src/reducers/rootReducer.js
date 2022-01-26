import { combineReducers } from 'redux';
import npcReducer from './npcReducer';
import questReducer from './questReducer';
import itemReducer from './itemReducer';

const rootReducer = () => 
    combineReducers({
        quests: questReducer,
        npcs: npcReducer,
        items: itemReducer,
    })

export default rootReducer;