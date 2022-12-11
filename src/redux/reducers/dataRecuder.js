export const data = (state = [], action) => {
    switch(action.type) {
        case "UPDATE_DATA": {
            state = action.payload;
            return state;
        }
        default: return state
    }
}