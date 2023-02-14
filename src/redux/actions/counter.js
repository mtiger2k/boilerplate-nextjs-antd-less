import { INCREMENT_COUNTER, DECREMENT_COUNTER, SET_COUNTER } from './types';

export const incrementCounter = (incrementState) => (dispatch) => {
	const increase = incrementState + 1;

	return dispatch({
		type: INCREMENT_COUNTER,
		payload: increase,
	});
};

export const decrementCounter = (decrementState) => (dispatch) => {
	const decrease = decrementState - 1;

	return dispatch({
		type: DECREMENT_COUNTER,
		payload: decrease,
	});
};

export const setCounter = (count) => (dispatch) => {
	return dispatch({
		type: SET_COUNTER,
		payload: count,
	});
};
