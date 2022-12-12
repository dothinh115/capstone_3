export const updateData = payload => ({
    type: "UPDATE_DATA",
    payload
});

export const addToCart = payload => ({
    type: "ADD_TO_CART",
    payload
});

export const loadCartData = payload => ({
    type: "LOAD_CART_DATA",
    payload
});

export const quantityUpdate = payload => ({
    type: "QUANTITY_UPDATE",
    payload
});

export const deleteCartItem = payload => ({
    type: "DELETE_CART_ITEM",
    payload
});