import {
  LOADING_DATA,
  SET_ORDERS,
  EDIT_STATUS,
  GET_USERS,
  GET_USER_DETAILS,
  UPDATE_USER,
  DELETE_USER,
} from "../types";

const initialState = {
  loading: false,
  deleteSuccessItem: null,
  users: [],
  userDetail: "",
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case EDIT_STATUS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? { ...action.payload } : order
        ),
      };
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        loading: false,
        userDetail: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        deleteSuccessItem: true,
      };
    default:
      return state;
  }
}
