import { combineReducers } from "redux";
import driverReducer from "./driverReducer";
import driverDetailReducer from "./driver_details_reducer";

const rootReducer = combineReducers({
  driverForm: driverReducer,
  driverDetailReducer: driverDetailReducer,
});

export default rootReducer;
