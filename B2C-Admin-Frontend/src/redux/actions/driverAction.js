import axios from "axios";
export const SUBMIT_DRIVER_FORM_REQUEST = "SUBMIT_DRIVER_FORM_REQUEST";
export const SUBMIT_DRIVER_FORM_SUCCESS = "SUBMIT_DRIVER_FORM_SUCCESS";
export const SUBMIT_DRIVER_FORM_FAIL = "SUBMIT_DRIVER_FORM_FAIL";

export const submitDriverForm = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_DRIVER_FORM_REQUEST });

    // Create a FormData object for handling file uploads
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    // Send POST request to the API
    const response = await axios.post(
      "https://b2c-backend-1.onrender.com/api/v1/deliveryPartner/profile",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: SUBMIT_DRIVER_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SUBMIT_DRIVER_FORM_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
