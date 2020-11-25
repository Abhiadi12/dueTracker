import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FETCH_ALL_ASSOCIATED_POST,
  FETCH_ALL_ASSOCIATED_POST_SUCCESS,
  FETCH_ALL_ASSOCIATED_POST_FAILURE,
  RESET_CONTACT,
} from "./contactTypes";
const initialContactState = {
  loading: false,
  contacts: [],
  error: "",
};

const filterRecordToDelete = (id, contacts) => {
  return contacts.filter((contact) => contact.id !== id);
};

const contactReducer = (state = initialContactState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: filterRecordToDelete(action.id, state.contacts),
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.id ? (contact = action.payload) : contact
        ),
      };
    case FETCH_ALL_ASSOCIATED_POST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_ASSOCIATED_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case FETCH_ALL_ASSOCIATED_POST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case RESET_CONTACT:
      return {
        ...initialContactState,
      };
    default:
      return state;
  }
};

export default contactReducer;
