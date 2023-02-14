/* eslint-disable react/button-has-type */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';

import Head from 'src/components/Head';
import { useSelector, useDispatch } from 'react-redux';

import wrapperStore from 'src/redux';

import { incrementCounter, decrementCounter, setCounter } from 'src/redux/actions/counter';

const CountPage = () => {
	const globalState = useSelector((state) => state.counter.counter);
	const dispatch = useDispatch();

	return (
		<>
			<Head title="Counter" />

			<h1>GLOBAL COUNTER {globalState}</h1>
			<button onClick={() => dispatch(incrementCounter(globalState))}>Increment +</button>
			{'  '}
			<button onClick={() => dispatch(decrementCounter(globalState))}>Decrement -</button>
		</>
	);
};

export const getServerSideProps = wrapperStore.getServerSideProps((store) => () => {
	store.dispatch(setCounter(10));
});

export default CountPage;
