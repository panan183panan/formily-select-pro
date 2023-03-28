import React from "react";
import "../index.css";
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  FormEffectHooks,
  FormPath,
  FormButtonGroup,
  Reset,
  FormSpy,
  LifeCycleTypes,
} from "@formily/antd";
import { createSchemaField } from "@formily/react";
import { Input, Select, Radio, DatePicker } from "@formily/antd-components";

const RadioGroup = Radio.Group; // 导入 Radio.Group 组件
function Need() {
  const actions = createFormActions();
  return (
    <>
      <div className="container">
        <p>
          需求1：简单表单
          姓名、籍贯为输入框，性别、婚姻状况为单选框，生日为日期选择框，身高、体重为数值输入框，教育程度为下拉框。
          用户输入后，数据实时同步显示在表单下方。
        </p>
      </div>

      <div className="container">
        <p>基于formily的表单设计（schemaFrom/Filed）</p>

        <div className="form">
          <SchemaForm
            actions={actions}
            components={{ Input, Select, RadioGroup, DatePicker }}
            labelAlign="right"
            style={{
              width: "50vw",
              textAlign: "left",
              marginLeft: "-35%",
            }}
          >
            <Field x-component="Input" required title="姓名" name="name" />
            <Field
              x-component="Input"
              required
              title="籍贯"
              name="nativePlace"
            />
            <Field x-component="Input" required title="身高" name="height" />
            <Field x-component="Input" required title="体重" name="weight" />
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
            />

            <FormSpy>
              {({ state, form }) => {
                // 由于formSpy会监听所有周期，包括form未init之前，所以form实例可能为null
                return (
                  <div>
                    姓名: {form && form.getFieldValue("name")}
                    <br />
                    籍贯: {form && form.getFieldValue("nativePlace")}
                    <br />
                    身高: {form && form.getFieldValue("height")}
                    <br />
                    体重: {form && form.getFieldValue("weight")}
                    <br />
                    性别: {form && form.getFieldValue("gender")}
                    <br />
                    婚姻: {form && form.getFieldValue("marriage")}
                    <br />
                    教育程度: {form && form.getFieldValue("education")}
                    <br />
                    生日: {form && form.getFieldValue("birthday")}
                  </div>
                );
              }}
            </FormSpy>
          </SchemaForm>
        </div>
      </div>
    </>
  );
}

export default Need;
