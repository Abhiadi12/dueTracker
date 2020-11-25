import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FETCH_ALL_ASSOCIATED_POST,
  FETCH_ALL_ASSOCIATED_POST_SUCCESS,
  FETCH_ALL_ASSOCIATED_POST_FAILURE,
  RESET_CONTACT,
} from "./contactTypes";
import axios from "axios";
import { setFlashMessage } from "../flash/flashActions";

export const addContact = (contact, user_id, token, successRedirect) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/v1/users/${user_id}/contacts`,
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: ADD_CONTACT, payload: response.data.data.attributes });
      dispatch(setFlashMessage("Data Added Successfully", "green"));
      successRedirect();
    } catch (error) {
      dispatch(
        setFlashMessage(
          "Your request can't be processed!! name or email already existed ",
          "orange"
        )
      );
      window.scrollTo(0, 0);
    }
  };
};

export const fetchAllPosts = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_ALL_ASSOCIATED_POST });
      const response = await axios.get("/api/v1/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      dispatch({
        type: FETCH_ALL_ASSOCIATED_POST_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALL_ASSOCIATED_POST_FAILURE,
        payload: "Something went wrong please reload the page",
      });
    }
  };
};

export const resetContact = () => {
  return {
    type: RESET_CONTACT,
  };
};

export const deleteContact = (user_id, contact_id, token) => {
  return async (dispatch) => {
    const response = await axios.delete(
      `/api/v1/users/${user_id}/contacts/${contact_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.status);
    if (response.status === 204) {
      dispatch({ type: DELETE_CONTACT, id: contact_id });
      dispatch(setFlashMessage("Record deleted successfully", "green"));
    } else {
      dispatch(setFlashMessage(response.data.message, "red"));
    }
  };
};

export const updateContact = (contact, user_id, contact_id, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/v1/users/${user_id}/contacts/${contact_id}`,
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: EDIT_CONTACT,
        id: contact_id,
        payload: response.data.data.attributes,
      });
      dispatch(setFlashMessage("Update Added Successfully", "green"));
    } catch (error) {
      dispatch(
        setFlashMessage(
          "Your request can't be processed!! name or email already existed ",
          "orange"
        )
      );
    }
    window.scrollTo(0, 0);
  };
};
