import { getBrandList, getManagerList } from "./http";
export function getManager() {
  return new Promise((resolve) => {
    getManagerList().then((res) => {
      const List = res.data.map((item) => {
        const obj = {
          label: item.name,
          value: item.id,
        };
        return obj;
      });
      resolve(List);
    });
  });
}

export function getBrand(id) {
  return new Promise((resolve) => {
    getBrandList(id).then((res) => {
      const List = res.data.map((item) => {
        const obj = {
          ...item,
          label: item.name,
          value: item.id,
        };
        return obj;
      });
      resolve(List);
    });
  });
}
