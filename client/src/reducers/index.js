import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import userReducer from './user-reducer.js';

const reducer = combineReducers({
    user: userReducer
});

export const store = configureStore({ reducer }, composeWithDevTools(applyMiddleware(thunk)));