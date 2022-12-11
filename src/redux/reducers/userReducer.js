export const user = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_UPDATE": {
            state = action.payload;
            return state;
        }
        default: return state;
    }
}

export const userData = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_USER_DATA": {
            let newState = {...state};
            for (let key in action.payload) {
                newState = {
                    ...newState,
                    [key]: action.payload[key]
                }
            }
            return newState;
        }
        default: return state;
    }
}