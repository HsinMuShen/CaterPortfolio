import firebase from "../utilis/firebase";

export const ActionType = {
  FILL_CONTENT: "FILL_CONTENT",
};

const cartItemsReducer = (
  content = {
    id: "",
    title: "",
    text: "",
    author: "",
  },
  action
) => {
  switch (action.type) {
    case ActionType.FILL_CONTENT: {
      const newCartItems = [...cartItems, action.payload.content];
      return newCartItems;
    }
    default:
      return cartItems;
  }
};

export default cartItemsReducer;
