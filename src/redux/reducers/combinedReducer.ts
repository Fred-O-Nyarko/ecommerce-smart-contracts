import { combineReducers } from "redux";
import ordersReducer from "./ordersReducer";
import productsReducer from "./productsReducer";

export default combineReducers({
    ordersReducer, 
    productsReducer
})