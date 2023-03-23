import React, { useEffect, useState } from "react";
// import { Select } from "@formily/next-components";
import { Select } from '@alife/ascp-design';
import { getManager, getBrand } from "../api";

export default function BrandSelect() {
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState("");

  return (
    <Select
    dataSource={brandList}
      // allowClear
      // title="品牌方"
      // onSelect={(value) => {
      //   console.log(value);
      // }}
    />
  );
}
BrandSelect.isFieldComponent = true