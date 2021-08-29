import {
  SET_USER,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  email: "",
  address:"",
  _id: "",
  firstName: "",
  lastName: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
