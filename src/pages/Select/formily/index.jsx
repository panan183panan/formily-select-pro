import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getManager, getBrand } from "../../../api";
import { Button } from "antd";

import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  FormEffectHooks,
  FormPath,
  FormButtonGroup,
  Reset,
} from "@formily/antd";
import { Select } from "@formily/antd-components";
import BrandSelect from "../scheme/component/brandSelect";

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
    onFieldValueChange$("managerSelect").subscribe((Filed) => {
      console.log(Filed);
      brandFun(Filed.value); //获取Select2列表信息函数
      setFieldState("brandSelect", (state) => {
        // state.value = undefined;
      });
    });
  };

  // const { onFormInit$, onFieldValueChange$, onFieldInit$ } = FormEffectHooks

  // const createLinkageUtils = () => {
  //   const { setFieldState } = createFormActions()
  //   const linkage = (key, defaultValue) => (path, value) =>
  //     setFieldState(path, state => {
  //       FormPath.setIn(state, key, value !== undefined ? value : defaultValue)
  //     })
  //   return {
  //     hide: linkage('visible', false),
  //     show: linkage('visible', true),
  //     enum: linkage('props.enum', []),
  //     loading: linkage('loading', true),
  //     loaded: linkage('loading', false),
  //     value: linkage('value')
  //   }
  // }

  // const useAsyncLinkageEffect = () => {
  //   const linkage = createLinkageUtils()
  //   onFieldValueChange$('managerSelect').subscribe(fieldState => {
  //     if (!fieldState.value) return
  //     linkage.show('brandSelect')
  //     linkage.loading('brandSelect')
  //     linkage.value('brandSelect', '正在搜索......')
  //     setTimeout(() => {
  //       linkage.loaded('brandSelect')
  //       linkage.enum('brandSelect', ['1111', '2222'])
  //       linkage.value('brandSelect', '1111')
  //     }, 2000)
  //   })
  // }

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
            x-component-props={{
              showSearch: true,
              allowClear: true,
              filterOption: (input, option) =>
                (option?.title ?? "").includes(input),
              onChange: (value,obj) => {
                console.log(value,"value");
                console.log(obj,"obj");
              },
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
          {/* 不刷新页面的情况下，只能成功第一次 */}
          <FormButtonGroup>
            <Button
              onClick={(e) => {
                console.log("value");
              }}
            >
              清空
            </Button>
          </FormButtonGroup>
        </SchemaForm>
      </div>
    </div>
  );
};
