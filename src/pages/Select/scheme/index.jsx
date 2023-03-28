import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { SchemaForm, SchemaMarkupField as Field, Submit } from "@formily/antd";
import { Select } from "@formily/antd-components";
import components  from "./component/index";

export default () => {

  return (
    <div className="container">
      <div>
        formily多文件封装<p></p>
      </div>
      <div className="form">
        <SchemaForm
          components={components}
        >
          <Field
            x-component="ManagerSelect"
            title="供应商"
            name="managerSelect"
          />
          <Field
            x-component="BrandSelect"
            title="品牌方"
            name="brandSelect"
          />
        </SchemaForm>
      </div>

    </div>
  );
};