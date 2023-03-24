import React, { useEffect, useState } from "react";
import { Select } from "@formily/antd-components";
import { getManager, getBrand } from "../../../api";

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
    <input type="tel"></input>
  );
}
ManagerSelect.isFieldComponent = true;

