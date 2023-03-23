import React, { useEffect, useState } from "react";
// import { Select } from "@formily/next-components";
import { Select } from '@alife/ascp-design';
import { getManager, getBrand } from "../api";

export default function ManagerSelect() {
  const [managerList, setManagerList] = useState([]);
  const [manager, setManager] = useState("");
  useEffect(() => {
    getManager()
      .then((res) => {
        setManagerList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Select
    dataSource={managerList}
      // allowClear
      // title="供应商"
      // onSearch={(inspectName) => {
      //   getManager(inspectName);
      // }}
      // onSelect={(value) => {
      //   getBrand(value).then((res) => {
      //     console.log(res);
      //     // setBrandList(res);
      //   });
      // }}
    />
  );
}
ManagerSelect.isFieldComponent = true;

