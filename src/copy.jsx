import React, { useEffect, useState } from "react";
import "./App.css";
import { getManager, getBrand } from "./api";

import { SchemaForm, SchemaMarkupField as Field } from "@formily/antd";
import { Select } from "@formily/antd-components";
import "antd/dist/reset.css";

export default () => {
  const [managerList, setManagerList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [manager, setManager] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    getManager().then((res) => {
      setManagerList(res)
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  return (
    <div className="container">
      <div>
        <h3>如何优雅地实现下拉选择器参数的联动</h3>
        <h4>1.选择供应商之后只能选供应商下的品牌（已完成）</h4>
        <h4>2.供应商和品牌都是下拉框 背后都有搜索接口（已完成）</h4>
        <h4>
          3.选供应商后 要把供应商id带到品牌的查询接口 作为查询条件（已完成）
        </h4>
        <h4>4.清除供应商之后，品牌的选中的值也要清空</h4>
        <h4>切换供应商后 品牌选中的也需要清空</h4>
      </div>
      <div className="form">
        <SchemaForm
          components={{
            Select,
          }}
        >
          <Field
            x-component="Select"
            enum={managerList}
            required
            title="供应商"
            name="simpleSelect"
            allowClear
            value={manager}
            x-component-props={{
              filterLocal: false,
              showSearch: true,
              hasClear: true,
              allowClear: true,
              onSearch: (inspectName) => {
                getManager(inspectName);
              },
              onChange: (value) => {
                getBrand(value).then(res=>{
                  setBrandList(res);
                })
              },
            }}
          />
          <Field
            x-component="Select"
            enum={brandList}
            required
            title="品牌方"
            name="objSelect"
            value={brand}
            x-component-props={{
              filterLocal: false,
              showSearch: true,
              allowClear: true,
              hasClear: true,
              onChange: (value, obj) => {
                console.log(value, obj);
              },
            }}
          />
        </SchemaForm>
      </div>
    </div>
  );
};

// git log
// git reset --hard
