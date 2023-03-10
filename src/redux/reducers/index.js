/* eslint-disable no-param-reassign */
/* --------------------------------------------------------
* Copyright ZelloSoft
* Website: https://www.zellosoft.com
*
* Author Tien Tran
* Email tientran@zellosoft.com
* Phone 0972970075
*
* Created: 2021-09-28 22:42:09
*------------------------------------------------------- */

import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import auth, { initialState as authInitial } from './auth';
import loader, { initialState as initialLoader } from './loader';
import counter, { initialState as initialCount } from './counter';

const extractWhiteList = (initialState, state, wl) => {
	const newData = Object.entries(initialState).reduce((preVal, [key, val]) => {
		if (wl.includes(key)) {
			preVal[key] = state[key];
		} else {
			preVal[key] = val;
		}
		return preVal;
	}, {});

	return newData;
};

export const whitelist = ['counter'];

export const initialState = {
	auth: authInitial,
	loader: initialLoader,
	counter: initialCount,
};

const appReducer = combineReducers({
	auth,
	loader,
	counter,
});

const reducers = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState;
	}
	return appReducer(action.type === 'LOGOUT_SUCCESS' ? extractWhiteList(initialState, state, whitelist) : state, action);
};

export default reducers;
