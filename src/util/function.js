import { dataConfig, loginKey } from "./config";

export const {
  getLocalStorage,
  saveLocalStorage,
  totalCount,
  getToken,
  getEmail,
  getDataConfig,
  getIndexDataConfig,
} = {
  getLocalStorage(name) {
    let data = localStorage.getItem(name);
    if (data) {
      data = JSON.parse(data);
      return data;
    }
    return null;
  },
  saveLocalStorage(name, data) {
    data = JSON.stringify(data);
    localStorage.setItem(name, data);
  },
  totalCount(arr, option) {
    let total = 0;
    for (let key in arr) {
      total += arr[key][option];
    }
    return total;
  },
  getToken() {
    const token = getLocalStorage(loginKey);
    if (token) return token.accessToken;
    return null;
  },
  getEmail() {
    const email = getLocalStorage(loginKey);
    if (email) return email.email;
    return null;
  },
  getDataConfig(key, id) {
    const index = dataConfig.id.findIndex((item) => item === id);
    return dataConfig[key][index];
  },
  getIndexDataConfig(id) {
    return dataConfig.id.findIndex((item) => item === id);
  },
};
