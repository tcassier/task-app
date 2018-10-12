import { combineReducers } from "redux";
import ListReducer from "./list_reducer";

const rootReducer = combineReducers({
  lists: ListReducer
});

export default rootReducer;
