import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getManager, getBrand } from "../../../../api";

export default function ManagerSelect(props) {
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

  const onChange = (value) => {
    console.log(value)
    setManager(value)
  }


  return (
    <Select options={managerList} value={manager} onChange={onChange}/>
  );
}
ManagerSelect.isFieldComponent = true;

