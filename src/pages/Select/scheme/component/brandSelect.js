import React, { useEffect, useState } from "react";
import { Select, Input } from "antd";
import { getManager, getBrand } from "../../../../api";

export default function BrandSelect() {
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState("");

  return (
    <Select />
  );
}
BrandSelect.isFieldComponent = true