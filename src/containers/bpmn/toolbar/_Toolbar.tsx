/*
 * @Author: yangzonglong
 * @Date: 2021-05-12 16:40:33
 * @version: v1.0.0
 * @Descripttion: 工作流编辑  工具栏
 * @LastEditors: yangzonglong
 * @LastEditTime: 2021-08-19 09:32:44
 * @Auditor: 
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import style from './toolbar.module.scss';

interface ToolBarProps {
  modeler: any;
  workflowId: string
}

export default ({ modeler, workflowId }: ToolBarProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [scale, setScale] = useState(1); // 缩放

  useEffect(() => {
    if (!modeler.get) return
    modeler.get('canvas').zoom(scale)
  }, [scale, modeler])

  const importFile = useCallback(e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {

      const query = {
        id: workflowId,
        time: (+ new Date()) + '' // 刷新字符串
      }
    }
  }, [workflowId])

  const onSave = useCallback(() => {
    modeler.saveXML({ format: false }, (err: any, XML: any) => {
      if (err) return 'saveFail';
    })
  }, [modeler, workflowId])

  const download = useCallback((type = 'XML') => {
    modeler['save'+type]({ format: false }, (err: any, data: any) => {
      if(err) return console.log(err);

      data && (() => {
        let aTag = window.document.createElement('a')
        Object.assign(aTag, {
          href: `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`,
          target: '_blank',
          download: `workflow.${type}`
        })
        aTag.click()
      })()
    })
  }, [modeler])

  return (
    <div className={style.editingTools}>
    <ul className={style.controlList}>

      <li className={`${style.control} ${style.line}`}>
        <input className={style.openFile} type="file" ref={fileRef} onChange={importFile}/>
        <button type="button" title="open" onClick={() => fileRef?.current?.click?.()}>
          <i className={style.open} />
        </button>
      </li>

      <li className={style.control}>
        <button type="button" title="undo" onClick={() => modeler.get('commandStack').undo()}>
          <i className={style.undo} />
        </button>
      </li>

      <li className={`${style.control} ${style.line}`}>
        <button type="button" title="redo" onClick={() => modeler.get('commandStack').redo()}>
          <i className={style.redo} />
        </button>
      </li>

      <li className={style.control}>
        <button type="button" title="reset zoom" onClick={() => setScale(1)}>
          <i className={style.zoom} />
        </button>
      </li>

      <li className={style.control}>
        <button type="button" title="zoom in" onClick={() => setScale(scale + 0.1)}>
          <i className={style.zoomIn} />
        </button>
      </li>

      <li className={`${style.control} ${style.line}`}>
        <button type="button" title="zoom out" onClick={() => setScale(scale - 0.1)}>
          <i className={style.zoomOut} />
        </button>
      </li>

      {/* 保存 */}
      <li className={style.control}>
        <button type="button" title="save" onClick={onSave}>
          <i className={style.save} />
        </button>
      </li>

      <li className={style.control}>
        <button type="button" title="download bpmn diagram" onClick={() => download('XML')}>
          <i className={style.download} />
        </button>
      </li>
      
      <li className={style.control}>
        <button type="button" title="download as svg image" onClick={() => download('SVG')}>
          <i className={style.image} />
        </button>
      </li>
    </ul>
  </div>
  )
}
