import React from "react";
import "../index.css";
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createAsyncFormActions,
  FormEffectHooks,
  FormPath,
  FormButtonGroup,
  Reset,
  FormSpy,
  LifeCycleTypes,
  Submit,
  registerValidationRules,
} from "@formily/antd";
import { createSchemaField } from "@formily/react";
import { Input, Select, Radio, DatePicker } from "@formily/antd-components";
import { Button, InputNumber } from "antd";
const RadioGroup = Radio.Group; // 导入 Radio.Group 组件
function Need() {
  const actions = createAsyncFormActions();

  //自定义函数规则
  registerValidationRules({
    //返回非空的字符串，则代表验证通过。
    dateRule: (value) => {
      let now = new Date(); //获取当前日期对象
      let date = new Date(value);
      return now < date ? "日期不能晚于今日" : "";
    },
  });

  return (
    <>
      <div className="container">
        <p>
          需求2：表单校验 增加表单验证功能。 表单验证规则如下：
          姓名不得为空。性别、婚姻状况、教育程度必须选择其中一项。
          生日必须是合法的日期格式。 身高、体重必须是数字，且不得小于0。
          当用户输入不合法数据时，显示错误提示信息。
        </p>
      </div>

      <div className="container">
        <p>基于formily的表单设计（schemaFrom/Filed）</p>

        <div className="form">
          <SchemaForm
            actions={actions}
            components={{
              Input,
              InputNumber,
              Select,
              RadioGroup,
              DatePicker,
              Button,
            }}
            labelAlign="right"
            style={{
              width: "50vw",
              textAlign: "left",
              marginLeft: "-35%",
            }}
            onSubmit={(value) => {
              console.log(value);
            }} // 添加 onSubmit 回调函数
          >
            <Field x-component="Input" required title="姓名" name="name" />
            <Field
              x-component="Input"
              required
              title="籍贯"
              name="nativePlace"
            />
            <Field
              x-component="InputNumber"
              required
              title="身高"
              name="height"
              minimum={0}
            />
            <Field
              x-component="InputNumber"
              required
              title="体重"
              name="weight"
              x-rules={[{ required: true }]}
              minimum={0}
            />
            <Field
              x-component="RadioGroup"
              required
              title="性别"
              name="gender"
              x-component-props={{
                options: [
                  { label: "男", value: "1" },
                  { label: "女", value: "2" },
                ],
              }}
            />
            <Field
              x-component="RadioGroup"
              required
              title="婚姻"
              name="marriage"
              x-component-props={{
                options: [
                  { label: "已婚", value: "1" },
                  { label: "未婚", value: "2" },
                ],
              }}
            />
            <Field
              x-component="Select"
              required
              title="教育程度"
              name="education"
              enum={[
                { label: "大专", value: "1" },
                { label: "本科", value: "2" },
                { label: "硕士", value: "3" },
              ]}
            />
            <Field
              x-component="DatePicker"
              required
              title="生日"
              name="birthday"
              x-rules={[{ required: true, dateRule: true }]}
              x-component-props={{
                style: {
                  width: 300,
                },
              }}
            />
            <FormButtonGroup>
              <Submit onSubmit={console.log}>Submit</Submit>
              <Button
                type="primary"
                onClick={() => {
                  actions.submit();
                }}
              >
                提交
              </Button>
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </div>
      </div>
    </>
  );
}

export default Need;
