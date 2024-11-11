// src/redux/reducers/driverReducer.js
import {
  SUBMIT_DRIVER_FORM_REQUEST,
  SUBMIT_DRIVER_FORM_SUCCESS,
  SUBMIT_DRIVER_FORM_FAIL,
} from "../actions/driverAction.js";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const driverFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_DRIVER_FORM_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case SUBMIT_DRIVER_FORM_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case SUBMIT_DRIVER_FORM_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default driverFormReducer;
