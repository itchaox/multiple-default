/*
 * @Version    : v1.00
 * @Author     : Wang Chao
 * @Date       : 2024-08-18 09:52
 * @LastAuthor : Wang Chao
 * @LastTime   : 2024-08-29 22:26
 * @desc       :
 */
// FIXME 多选默认值

import { basekit, FieldType, field, FieldComponent, FieldCode } from '@lark-opdev/block-basekit-server-api';

const moment = require('moment');
require('moment-lunar');

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['api.exchangerate-api.com']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        source: '辅助字段',
        changeType: '默认值',
        p1: '请任选一个字段即可',
        p2: '请输入默认值',
        p3: '多个默认值请换行输入',
      },
      'en-US': {
        source: 'Auxiliary Field',
        changeType: 'Default Value',
        p1: 'Please select any field.',
        p2: 'Please enter the default value.',
        p3: 'For multiple default values, please enter each on a new line.',
      },
      'ja-JP': {
        source: '補助フィールド',
        changeType: 'デフォルト値',
        p1: '任意のフィールドを選択してください。',
        p2: 'デフォルト値を入力してください。',
        p3: '複数のデフォルト値の場合は、改行して入力してください。',
      },
    },
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'changeType',
      label: t('changeType'),
      component: FieldComponent.Input,
      props: {
        placeholder: t('p2'),
      },
      tooltips: [
        {
          type: 'text',
          content: t('p3'),
        },
      ],
      validator: {
        required: true,
      },
    },
    {
      key: 'source',
      label: t('source'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [
          FieldType.DateTime,
          FieldType.Text,
          FieldType.Number,
          FieldType.Url,
          FieldType.SingleSelect,
          FieldType.MultiSelect,
          FieldType.Attachment,
          FieldType.Checkbox,
          FieldType.DateTime,
        ],
        placeholder: t('p1'),
      },
      validator: {
        required: true,
      },
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.MultiSelect,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { changeType: any; source: { type: string; text: string }[] | number }) => {
    const { source, changeType } = formItemParams;

    try {
      return {
        code: FieldCode.Success,
        data: changeType.split('\n'),
      };
    } catch (e) {
      return {
        code: FieldCode.Error,
      };
    }
  },
});
export default basekit;
