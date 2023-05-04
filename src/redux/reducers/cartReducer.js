import { actionTypes} from "../constants/actionTypes";

export const cart = (state=[] ,{type , payload}) => {
    switch (type) {
        case actionTypes.GET_CART:
            return[state]
        
        case actionTypes.ADD_TO_CART:
            return [...state , payload]

        case actionTypes.REMOVE_FROM_CART:
            const updatedCart = state.filter((item) => item._id !== payload)
            return [...updatedCart]

        case actionTypes.INCREASE_QUANTITY:
            const updatedState = state.map((item) => {
                if (item._id === payload) {
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                }
                return item;
              });
            return updatedState

        case actionTypes.DECREASE_QUANTITY:
            const modifiedState = state.map((item) => {
                if (item._id === payload) {
                  return {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                }
                return item;
              });
            return modifiedState

        default:
            return state
    }

}