export const { getLocalStorage, saveLocalStorage } = {
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
    }
}