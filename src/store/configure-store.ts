import { History } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore, ReducersMapObject, Store, StoreEnhancer, StoreEnhancerStoreCreator } from 'redux';
import thunk from 'redux-thunk';
import * as StoreModule from '.';
import { IApplicationState, reducers } from '.';
import { WebSocketMiddleware } from 'src/store/socket-create-middleware';

export default function configureStore(history: History, initialState?: IApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk, routerMiddleware(history), WebSocketMiddleware.getInstance().InvokeMiddleware),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<IApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('src/store', () => {
            const nextRootReducer = require<typeof StoreModule>('src/store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

   
    return store;
}

function buildRootReducer(allReducers: ReducersMapObject<IApplicationState, any>) {
    return combineReducers<IApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
