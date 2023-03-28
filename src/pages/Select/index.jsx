import React from 'react';
import Antd from './antd/index';
import Formily from './formily/index';
import Scheme from './scheme/index';
import "antd/dist/reset.css";
function Pages() {
  return (
    <div>
      <Antd />
      <Formily />
      <Scheme />
    </div>
  );
}

export default Pages;
