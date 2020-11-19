import {
  REQUEST_FOR_CURRENT_USER,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  LOGOUT,
} from "./authTypes";
import axios from "axios";
import { setError } from "../error/errorActions";
import { setFlashMessage } from "../flash/flashActions";

export const requestForCurrentUser = () => {
  return {
    type: REQUEST_FOR_CURRENT_USER,
  };
};

export const fetchCurrentUserSuccess = (response) => {
  return {
    type: FETCH_CURRENT_USER_SUCCESS,
    current_user: response.current_user,
    token: response.token,
  };
};

export const fetchCurrentUserFailure = () => {
  return {
    type: FETCH_CURRENT_USER_FAILURE,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

/*export const deleteUserAccount = (id) => {
  return {
    type: DELETE_USER_ACCOUNT,
    id: id,
  };
};
*/

export const fetchUser = (email, password) => {
  return async (dispatch) => {
    //initial load true
    dispatch(requestForCurrentUser());
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/login`, {
        email,
        password,
      });
      dispatch(fetchCurrentUserSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchCurrentUserFailure());
      dispatch(
        setFlashMessage(" Invalid credentails plesae try again ", "red")
      );
    }
  };
};

export const createUser = (newUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/v1/users`, newUser);
      console.log(response.data);
      if (response.data.errors) dispatch(setError(response.data.errors));
      else {
        dispatch(fetchCurrentUserSuccess(response.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(setFlashMessage("Something went wrong please try again", "red"));
    }
  };
};

export const deleteUser = (user, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/v1/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.message)
        dispatch(setFlashMessage(response.data.message));
      else dispatch(logout());
    } catch (error) {
      console.log(error);
      dispatch(setFlashMessage(" Unauthorized request can't process ", "red"));
    }
  };
};

export const updateUser = (id, editedData, token) => {
  console.log(editedData);
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/v1/users/${id}`, editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.errors) dispatch(setError(response.data.errors));
      else {
        dispatch(fetchCurrentUserSuccess(response.data));
        dispatch(setFlashMessage(" Updated successfully ", "green"));
      }
    } catch (error) {
      dispatch(setFlashMessage(error.response.data.message, "red"));
    }
  };
};
