import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore(preLoadedState) {
    const composeEnhancer = 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer(),
        preLoadedState,
        composeEnhancer(applyMiddleware(thunk))
    );
    return store;
}
