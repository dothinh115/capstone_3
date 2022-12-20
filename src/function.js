export const { getLocalStorage, saveLocalStorage, totalCount } = {
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
    }
}