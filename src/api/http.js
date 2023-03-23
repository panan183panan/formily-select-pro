import instance from "../utils/request";

export function getManagerList() {
  return instance.get(`/manager`).then((res) => {
    return res;
  });
}

export function getBrandList(id) {
  return instance.get(`/brand?managerId=${id}`).then((res) => {
    return res;
  });
}
