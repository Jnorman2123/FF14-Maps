import { combineReducers } from 'redux';
import questReducer from './questReducer';

const rootReducer = () => 
    combineReducers({
        quests: questReducer,
    })

export default rootReducer;