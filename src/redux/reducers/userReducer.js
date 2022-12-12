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