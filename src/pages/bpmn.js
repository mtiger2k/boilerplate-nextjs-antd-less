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
import dynamic from "next/dynamic";
const Bpmn = dynamic(() => import('src/containers/bpmn'), {
    ssr: false,
});

const BpmnEditor = () => {
	return (
		<>
			<Head title="Bpmn Editor" />

			<Bpmn />
		</>
	);
};

export default BpmnEditor;
