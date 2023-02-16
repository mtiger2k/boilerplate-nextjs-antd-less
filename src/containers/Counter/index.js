/* eslint-disable react/button-has-type */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';

import { Button } from 'antd';

import { useSelector, useDispatch } from 'react-redux';

import { incrementCounter, decrementCounter } from 'src/redux/actions/counter';

import classes from './style.module.scss';

const content = {
	marginTop: '10px',
};

const Count = () => {
	const globalState = useSelector((state) => state.counter.counter);
	const dispatch = useDispatch();

	return (
		<div className={classes.wrapper} style={content}>
			<div className="text-center mb-5">
				<div className={classes.textVal}>Redux demo - Counter</div>
			</div>

			<div>
				<h1>GLOBAL COUNTER {globalState}</h1>
				<Button onClick={() => dispatch(incrementCounter(globalState))}>Increment +</Button>
				{'  '}
				<Button onClick={() => dispatch(decrementCounter(globalState))}>Decrement -</Button>
			</div>
		</div>
	);
};

export default Count;
