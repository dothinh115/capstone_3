import axios from "axios";

export const { getLocalStorage, saveLocalStorage, totalCount, sendAxios } = {
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
    sendAxios(url, token, data = {}) {
        return async () => {
            try {
                await axios({
                    url,
                    method: "POST",
                    dataType: "application/json",
                    data,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}