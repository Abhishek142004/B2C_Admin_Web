import {
  FETCH_DRIVER_DETAILS_REQUEST,
  FETCH_DRIVER_DETAILS_SUCCESS,
  FETCH_DRIVER_DETAILS_FAIL,
} from "../actions/fetch_detail_action";

const initialDetailsState = {
  loading: false,
  data: null,
  error: null,
};

const driverDetailsReducer = (state = initialDetailsState, action) => {
  switch (action.type) {
    case FETCH_DRIVER_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DRIVER_DETAILS_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_DRIVER_DETAILS_FAIL:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default driverDetailsReducer;
