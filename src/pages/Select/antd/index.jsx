import Reactm, { useState, useEffect } from "react";
import { Select } from "antd";
import { getManager, getBrand } from "../../../api";

function Antd() {
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

  const onChange = (value, obj) => {
    setManager(obj?.label || "");
    brandFun(value);
    setBrand("");
  };

  const onSearch = (value, obj) => {
    brandFun(value);
  };

  const onChange1 = (value, obj) => {
    setBrand(obj?.label || "");
  };

  const clear = () => {
    setManager("");
    setBrand("");
  };

  return (
    <div className="container">
      <div>
        <h3>如何优雅地实现下拉选择器参数的联动</h3>
      </div>
      <div>
        1、antd组件库(所有功能)实现<p></p>
      </div>
      <label>供应商：</label>
      <Select
        title="供应商"
        showSearch
        allowClear
        optionFilterProp="children"
        dropdownMatchSelectWidth
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        options={managerList}
        onClear={clear}
        value={manager}
        style={{
          width: "50%",
        }}
      />
      <br />
      <br />
      <label>品牌方：</label>
      <Select
        title="品牌方"
        showSearch
        allowClear
        optionFilterProp="children"
        dropdownMatchSelectWidth
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        options={brandList}
        style={{
          width: "50%",
        }}
        onChange={onChange1}
        value={brand}
      />
    </div>
  );
}

export default Antd;
