/*
 * @Author: yangzonglong
 * @Date: 2021-05-08 11:21:26
 * @version: v1.0.0
 * @Descripttion: 类型声明
 * @LastEditors: yangzonglong
 * @LastEditTime: 2023-02-15 20:57:59
 * @Auditor: 
 */
export interface FormProps extends Record<string, any> {
  formName: string;
  formDesc: string;
  formEngine: string;
  createdAt: string;
  content: string;
  id?: string;
}
export interface FormDataProps extends Record<string, any> {
  data: string;
}
export interface WorkFlowHeadProps extends Record<string, any> {
  bpmnContent: string;
  formId: string;
  formName: string;
  workflowNumber: string;
  id?: string;
  status: string;
}

export interface AuthorizationProps extends Record<string, any> {
  workflowNumber: string;
  id: string;
  authorizer: string;
  authorizerName: string;
  createdAt: string;
  createdBy: string;
  createdByUser: string;
  endDate: string;
  licensee: string;
  licenseeName: string;
  startDate: string;
  updatedAt: string;
  updatedBy: string;
  updatedByUser: string;
  workflowCode: string;
  workflowName: string;
}

export interface WorkFlowInstanceProps extends Record<string, any> {
  formId?: string;
  formDataId?: string;
  formURL?: string;
  businessId?: string;
  id: string;
  workflowId: string;
  state: string; // 当前工作流 流程状态
}
export interface FormField {
  name: string;
  fieldName: string;
  controlId: string;
  type: string;
  options?: any;
  $type?: string; // bpmn 节点类型
}
export interface DeliverForm extends Record<string, any> {
  taskId?: any;
  transferReason?: string;
  transferToUserId?: string;
  transferToUserName?: string;
}

export type SelfType = 'bpmn:SequenceFlow' | 'bpmn:StartEvent' | 'bpmn:EndEvent' | 'bpmn:SequenceFlow' | 'bpmn:UserTask' | 'bmpn:ReceiveTask' | 'bmpn:ScriptTask';

export interface ScriptTaskProps {
  type?: 'bmpn:ScriptTask';
  parent?: BseSelfProps;
  businessObject?: {
    name?: string;
    script?: string;
    eventTypeCode?: string;
    eventTypeName?: string;
  };
}
export interface ReceiveTaskProps {
  $type?: 'bmpn:ReceiveTask';
  id?: string;
  parent?: BseSelfProps;
  businessObject?: {
    id?: string;
    name?: string;
    assignStrategy?: string;
    ccStrategy?: string;
    bccStrategy?: string;
    informTitle?: string;
    informContent?: string;
    extensionElements?: {
      values?: [
        {
          values: Array<{ id: string; name: string; }>;
        },
        {
          values: Array<{ id: string; name: string; }>;
        },
        {
          values: Array<{ id: string; name: string; }>;
        }
      ]
    };
  };
}

// 条件设置
export type GateConditionVarProps = {
  $type?: string; // xml node type
  variableContext: 'global' | 'button';
  variableName: string;
  variableType: string;
  variableId: string; // 节点的ID
  variableOptions: string;
  fieldName: string;
  term: '<' | '>' | '===' | '!==' | '<=' | '>=';
  comparesValue: string;
};

// BPMN SELF
export interface BseSelfProps {
  type?: SelfType,
  children?: [StartEventSelfProps, UserTaskSelfProps, SequenceFlowSelfProps, EndEventSelfProps];
}

export interface SequenceFlowSelfProps {
  type?: 'bpmn:SequenceFlow';
  id?: string;
  parent?: BseSelfProps;
  source?: {
    id: string;
  };
  businessObject?: {
    id?: string; // SequenceFlow id
    name?: string; // SequenceFlow name
    conditionExpression?: { // 脚本定义
      isCustomScript?: boolean;
      body?: string;
    },
    extensionElements?: {
      values?: [
        {
          $type: 'huilian:ANDGateConditionVar',
          values?: GateConditionVarProps[];
        },
        {
          $type: 'huilian:ORGateConditionVar',
          values?: GateConditionVarProps[];
        }
      ];
    };
  };
}
export interface StartEventSelfProps {
  type?: 'bpmn:StartEvent';
  id?: string;
  parent?: BseSelfProps;
  businessObject?: {
    formPageId?: string;
    formPageName?: string;
    name?: string;
    enableFeedbackNotification?: boolean;
    extensionElements?: {
      values?: [
        {
          $type: 'huilian:GlobalVar',
          values?: FormField[];
        }
      ];
    };
  };
}

export interface EndEventSelfProps {
  type?: 'bpmn:StartEvent';
  id?: string;
  parent?: BseSelfProps;
  businessObject?: {
    name?: string;
  };
}
export interface UserTaskSelfProps {
  type?: 'bpmn:UserTask';
  id?: string;
  parent?: BseSelfProps;
  businessObject?: {
    id?: string;
    name?: string;
    approvalTypeCode?: string; // 会签 或 会签
    approvalTypeName?: string;
    assignStrategy?: string;
    approvalDistinct?: string;
    assignValue?: string | string[],
    assignDesc?: string | string[],
    enableEmailNotification?: boolean,
    errorHandlingCode?: '10' | '20' | '30',
    extensionElements?: {
      values?: [
        {
          $type: 'huilian:ActionData',
          values?: Array<{ action: string, label: string; }>;
        },
        {
          $type: 'huilian:InvisibleList',
          values?: FormField[];
        },
        {
          $type: 'huilian:EditableNode',
          values?: FormField[];
        },
        {
          $type: 'huilian:PageSetting',
          values?: [
            {
              show?: 'true' | 'false' | boolean,
              require?: 'true' | 'false' | boolean,
              enable?: 'true' | 'false' | boolean,
              commentShow?: 'true' | 'false' | boolean,
              commentRequire?: 'true' | 'false' | boolean;
            }
          ];
        }
      ];
    };
  };
}