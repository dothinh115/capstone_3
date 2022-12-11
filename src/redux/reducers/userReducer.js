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
            state = action.payload;
            return state;
        }
        default: return state;
    }
}