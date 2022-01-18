import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import questReducer from './questReducer';

const rootReducer = (history) => 
    combineReducers({
        router: connectRouter(history),
        quests: questReducer,
    })

export default rootReducer;