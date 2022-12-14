export const data = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_DATA": {
            state = action.payload;
            return state;
        }
        default: return state
    }
}

export const cart = (state = [], action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            let newState = [...state];
            const { payload } = action;
            const index = newState.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                newState[index] = {
                    ...newState[index],
                    quantity: newState[index].quantity + payload.quantity
                }
            }
            else {
                newState = [
                    ...newState,
                    payload
                ]
            }
            return newState;
        }
        case "LOAD_CART_DATA": {
            state = action.payload;
            return state;
        }
        case "QUANTITY_UPDATE": {
            let newState = [...state];
            const { payload } = action;
            const index = newState.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                newState[index] = {
                    ...newState[index],
                    quantity: newState[index].quantity + payload.value
                }
            }
            return newState;
        }
        case "DELETE_CART_ITEM": {
            const { payload } = action;
            let newState = [...state];
            const index = newState.findIndex(item => item.id === payload);
            if (index !== -1) {
                newState.splice(index, 1);
            }
            return newState;
        }
        case "SET_CHECKED": {
            let newState = [...state];
            const { payload } = action;
            const index = newState.findIndex(item => item.id === payload);
            if (index !== -1) {
                newState[index] = {
                    ...newState[index],
                    checked: !newState[index].checked
                }
            }
            return newState;
        }
        case "SET_ALL": {
            let newState = [...state];
            for (let key in newState) {
                newState[key] = {
                    ...newState[key],
                    checked: action.payload
                }
            }
            return newState;
        }
        default: return state;
    }
}