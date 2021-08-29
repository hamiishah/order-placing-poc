import {
  LOADING_DATA,
  SET_ORDERS,
  EDIT_STATUS,
  DELETE_USER,
  GET_USERS,
  GET_USER_DETAILS,
  UPDATE_USER,
} from "../types";
import axios from "../../src/util/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 2000,
  draggable: false,
  //same as ToastContainer props
});
const options = {
  autoClose: 2000,
  type: toast.TYPE.INFO,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true,
  // and so on ...
};

export const placeOrder = (history) => (dispatch) => {
  axios
    .post("/order")
    .then((res) => {
      history.push("/orders");
      dispatch(getOrders());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getOrders = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/orders")
    .then((res) => {
      dispatch({
        type: SET_ORDERS,
        payload: res.data.orders,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
export const getUsers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/users")
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data.users,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
export const detailsUser = (userId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  let body = { _id:userId}
  axios
    .post(`/user`,body)
    .then((res) => {
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const deleteUser = (userId) => (dispatch) => {
    let body = {
        _id:userId,
    }
  axios
    .post(`/user-delete`,body)
    .then((res) => {
      dispatch({
        type: DELETE_USER,
        payload: res.data,
      });
      toast.error("Deleted Successfully", options);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
export const updateUser = (userData) => (dispatch) => {
  axios
    .post(`/user-edit`, { data: userData })
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data.users,
      });
      toast.success("Updated Successfully", options);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const changeOrderStatus = (orderId, body) => (dispatch) => {
  body._id = orderId;
  axios
    .post(`/order-status`, body)
    .then((res) => {
      dispatch({
        type: EDIT_STATUS,
        payload: res.data.updatedOrder,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const socketStatusUpdate = (order) => (dispatch) => {
  dispatch({
    type: EDIT_STATUS,
    payload: order,
  });
};
