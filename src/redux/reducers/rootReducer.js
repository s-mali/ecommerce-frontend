import authReducer from './authReducer';
import { combineReducers } from "redux";
import { fatchProducts, productDetails } from './productReducer';

const rootReducer = combineReducers({
   allProducts : fatchProducts,
   productDetails : productDetails
})



export default rootReducer;

