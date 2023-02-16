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
import Counter from 'src/containers/Counter';

import wrapperStore from 'src/redux';

import { setCounter } from 'src/redux/actions/counter';

const CountPage = () => {
	return (
		<>
			<Head title="Counter" />

			<Counter />
		</>
	);
};

export const getServerSideProps = wrapperStore.getServerSideProps((store) => () => {
	store.dispatch(setCounter(10));
});

export default CountPage;
