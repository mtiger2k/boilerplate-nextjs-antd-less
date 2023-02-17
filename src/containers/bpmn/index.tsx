import React, { useEffect, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { diagramXML } from './sources/xml';
import styles from './bpmn.module.scss';
import huilianExtension from './config/huilian.json';
import camundaExtension from './config/camunda.json';

import {  StartEventSelfProps, UserTaskSelfProps, SequenceFlowSelfProps } from './interface';

import Toolbar from './toolbar/_Toolbar';

export default () => {

  const [modeler, setModeler] = useState<any>({});
  const [self, setSelf] = useState<StartEventSelfProps | UserTaskSelfProps | SequenceFlowSelfProps>({})


  useEffect(() => {
    // if (!workflow.bpmnContent) return;

    const modeler = new BpmnModeler({
      container: '#modeler',
      moddleExtensions: { huilian: huilianExtension, camunda: camundaExtension }
    })

    modeler.importXML(diagramXML, (err: ErrorEvent) => {
      if (err) return console.log(err);

      modeler.on('element.changed', (ev: any) => {
      })

      modeler.on('selection.changed', (ev: any) => {
        setSelf(ev.newSelection?.[0]);
      })

      setModeler(modeler);
    })

    return () => modeler.destroy();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.canvas} id="modeler" />
      <Toolbar modeler={modeler} workflowId={''} />
    </div>
  )
  
}
