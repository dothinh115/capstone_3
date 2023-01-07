import { dataConfig, loginKey } from "./config";

export const {
  getLocalStorage,
  saveLocalStorage,
  totalCount,
  getToken,
  getEmail,
  getDataConfig,
  getIndexDataConfig,
  suffleArray,
  reverseString,
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
  suffleArray(arr, number) {
    //copy từ redux ra mảng mới
    arr = [...arr];
    let randomIndex;
    //currentIndex số phần tử trong mảng
    let currentIndex = arr.length;
    //trong khi vẫn còn phần tử trong mảng, chạy vòng lặp
    while (currentIndex !== 0) {
      //chọn random vị trí 1 phần tử trong mảng, ví dụ randomIndex = 1
      randomIndex = Math.floor(Math.random() * currentIndex);
      //trừ số phần tử đi 1
      currentIndex--;
      //tiến hành đảo phần tử cuối với phần tử random, ví dụ là arr[1]
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr.slice(0, number);
  },
  reverseString(string) {
    string = string.split("-").reverse();
    return string.join("/");
  },
};
