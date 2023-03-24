import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getManager, getBrand } from "../../api";

import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  FormEffectHooks,
} from "@formily/antd";
import { Select } from "@formily/antd-components";
import "antd/dist/reset.css";

export default () => {
  // 存储供应商列表
  const [managerList, setManagerList] = useState([]);
  // 存储品牌商列表
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    // 初始化供应商列表
    managerFun("");
  }, []);

  // 获取供应商列表
  const managerFun = async () => {
    // 获取供应商列表
    await getManager()
      .then((res) => {
        setManagerList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 根据供应商Id获取品牌方列表
  const brandFun = async (value) => {
    await getBrand(value)
      .then((res) => {
        setBrandList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { onFieldValueChange$ } = FormEffectHooks;
  const useOneToManyEffects = () => {
    const { setFieldState } = createFormActions();
    // 监听订阅managerSelect组件的变化
    onFieldValueChange$("managerSelect").subscribe(({ value }) => {
      setFieldState("brandSelect", (state) => {
        state.value = "";
      });
    });
  };

  return (
    <div className="container">
      <div>
        2、formily/antd实现（基于SchemaForm/Filed、formily api）<p></p>
      </div>
      <div className="form">
        <SchemaForm
          effects={() => {
            useOneToManyEffects();
          }}
          components={{
            Select,
          }}
        >
          <Field
            x-component="Select"
            enum={managerList}
            required
            title="供应商"
            name="managerSelect"
            allowClear
            x-component-props={{
              showSearch: true,
              allowClear: true,
              onChange: (value, obj) => {
                // 根据id搜索品牌商列表
                brandFun(value);
              },
              filterOption: (input, option) =>
                (option?.title ?? "").includes(input),
            }}
          />
          <Field
            x-component="Select"
            enum={brandList}
            required
            title="品牌方"
            name="brandSelect"
            x-component-props={{
              showSearch: true,
              allowClear: true,
              filterOption: (input, option) =>
                (option?.title ?? "").includes(input),
            }}
          />
        </SchemaForm>
      </div>
    </div>
  );
};
