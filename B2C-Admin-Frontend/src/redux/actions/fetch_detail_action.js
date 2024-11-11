import axios from "axios";
export const FETCH_DRIVER_DETAILS_REQUEST = "FETCH_DRIVER_DETAILS_REQUEST";
export const FETCH_DRIVER_DETAILS_SUCCESS = "FETCH_DRIVER_DETAILS_SUCCESS";
export const FETCH_DRIVER_DETAILS_FAIL = "FETCH_DRIVER_DETAILS_FAIL";

export const fetchDriverDetails = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DRIVER_DETAILS_REQUEST });

    // Send GET request to fetch driver details
    const response = await axios.get(
      "https://b2c-backend-1.onrender.com/api/v1/admin/deliveryInsights"
    );

    dispatch({
      type: FETCH_DRIVER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DRIVER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
