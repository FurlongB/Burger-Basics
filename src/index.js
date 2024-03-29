import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import middlewareSaga from 'redux-saga';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import ordersReducer from './store/reducers/order';
import authReducer from './store/reducers/Auth';
import {watchAuth, watchBurgerBuilder, watchOrders} from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;

const rootReducer  = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: ordersReducer,
    auth: authReducer
})

const sagaMiddleware = middlewareSaga();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>  
    </Provider>
      
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
