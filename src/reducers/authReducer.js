// authReducer.js
import { SIGN_IN, SIGN_OUT } from "../actions/types";
const _user = localStorage.getItem("hotel_user");
const _payload = _user ? JSON.parse(_user) : {};
const INTIAL_STATE = {
  isSignedIn: false,
  payload: _payload
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, payload: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, payload: {} };
    default:
      return state;
  }
};
