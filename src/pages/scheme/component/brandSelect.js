import React, { useEffect, useState } from "react";
import { Select, Input } from "@formily/antd-components";
import { getManager, getBrand } from "../../../api";

export default function BrandSelect() {
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState("");

  return (
    <input type="button" value="hello"></input>
  );
}
BrandSelect.isFieldComponent = true