import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as RoutesModule from 'src/routes';
import configureStore from 'src/store/configure-store';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { IApplicationState } from 'src/store';
import { Provider } from 'react-redux';
import { WebSocketMiddleware } from 'src/store/socket-create-middleware';
import './index.scss';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';


/* Global CSS imports */
// Create browser history to use in the Redux store
const baseUrl       = (document.getElementsByTagName('base')[0] || {} as HTMLBaseElement).href;
const history       = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState  = (window as any).initialReduxState as IApplicationState;
const store         = configureStore(history, initialState);
let routes          = RoutesModule.routes;

function renderApp() {
    WebSocketMiddleware.getInstance().CreateMiddleware(store, () => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <ConnectedRouter history={history} children={routes} />
                </Provider>
            </AppContainer>,
            document.getElementById('root') as HTMLElement
        );
    });
}

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}

renderApp();