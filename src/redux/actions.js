export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const changeCartQty = (payload, qty) => ({
  type: "CHANGE_QTY",
  payload: payload,
});

export const removeCartItem = (payload) => ({
  type: "REMOVE_ITEM",
  payload: payload,
});
