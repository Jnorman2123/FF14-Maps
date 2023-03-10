import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { createWrapper } from "next-redux-wrapper";

export default function configureStore(preLoadedState) {
    // const composeEnhancer = 
    //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer(),
        preLoadedState,
        applyMiddleware(thunk)
    );
    return store;
}

export const wrapper = createWrapper(configureStore);