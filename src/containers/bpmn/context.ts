/*
 * @Author: yangzonglong
 * @Date: 2021-05-13 10:09:04
 * @version: v1.0.0
 * @Descripttion: bpmn context
 * @LastEditors: yangzonglong
 * @LastEditTime: 2021-05-19 10:00:37
 * @Auditor: 
 */
import { createContext } from 'react';
import { UserTaskSelfProps, StartEventSelfProps, SequenceFlowSelfProps, EndEventSelfProps, ReceiveTaskProps, ScriptTaskProps } from './interface';

type Self = UserTaskSelfProps | StartEventSelfProps | SequenceFlowSelfProps | EndEventSelfProps | ReceiveTaskProps | ScriptTaskProps;

export default createContext<{self: Self, modeler: any}>({
  self: {},
  modeler: {}
});