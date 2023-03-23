import React, { useEffect, useState } from "react";
import "./App.css";
import { getManager, getBrand } from "./api";

import { SchemaForm, SchemaMarkupField as Field } from "@formily/antd";
import { Select } from "@formily/antd-components";
import "antd/dist/reset.css";

export default () => {
  const [enumList, setEnumList] = useState([]);

  // 存储供应商列表
  const [managerList, setManagerList] = useState([]);
  // 存储品牌商列表
  const [brandList, setBrandList] = useState([]);
  // 当前供应商的id
  const [manager, setManager] = useState("");
  // 当前品牌方的id
  const [brand, setBrand] = useState("");

  useEffect(() => {
    // 初始化供应商列表
    managerFun("");
  }, []);

  // 获取供应商列表
  const managerFun = () => {
    // 获取供应商列表
    getManager()
      .then((res) => {
        setManagerList(res);
        setEnumList(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 根据供应商Id获取品牌方列表
  const brandFun = (value) => {
    getBrand(value)
      .then((res) => {
        setBrandList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 供应商列表搜索
  const managerSearch = (name) => {
    // 根据输入进行本地查询
    const List=managerList.filter(item=>item.label.includes(name))
    // 查询结果赋值到列表
    setEnumList(List)
  };

  // 品牌方列表搜索
  const brandSearch = () => {};


  return (
    <div className="container">
      <div className="form">
        <SchemaForm
          components={{
            Select,
          }}
        >
          <Field
            x-component="Select"
            enum={enumList}
            required
            title="供应商"
            name="simpleSelect"
            allowClear
            x-component-props={{
              // loading:true,
              showSearch: true,
              allowClear: true,
              onSearch: (inspectName) => {
                managerSearch(inspectName);
              },
              onChange: (value, obj) => {
                // console.log(value, obj);
                // 设置当前列表选中的值
                setManager(value);
                // 获取列表
                managerFun();
                // 根据id搜索品牌商列表
                brandFun(value);
                // 清除品牌商的值
              },
              value: manager,
              onClear: () => {
                // 清除品牌商的值

                setBrand("");
              },
            }}
          />
          <Field
            x-component="Select"
            enum={brandList}
            required
            title="品牌方"
            name="objSelect"
            x-component-props={{
              showSearch: true,
              allowClear: true,
              onChange: (value) => setBrand(value),
              onSearch: (inspectName) => {
                console.log(inspectName);
              },
              value: brand,
            }}
          />
        </SchemaForm>
      </div>

      <div>
        <h3>如何优雅地实现下拉选择器参数的联动</h3>
        <h4>1.选择供应商之后只能选供应商下的品牌（已完成）</h4>
        <h4>2.供应商和品牌都是下拉框 背后都有搜索接口（已完成）</h4>
        <h4>
          3.选供应商后 要把供应商id带到品牌的查询接口 作为查询条件（已完成）
        </h4>
        <h4>
          4.清除供应商之后，品牌的选中的值也要清空、切换供应商后
          品牌选中的也需要清空
        </h4>
      </div>
    </div>
  );
};

// git log
// git reset --hard
