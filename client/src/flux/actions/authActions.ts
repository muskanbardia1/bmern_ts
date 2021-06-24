import axios from './axios';
import {Dispatch} from 'redux';

import {IAction} from "../../types/interfaces"
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
import { IUser, IConfigHeaders } from '../../types/interfaces';

// Check token & load user
export const getUserById = (id?:string) => (dispatch: Dispatch<IAction>, getState: Function) => {
  // User loading
  dispatch({ type: USER_LOADING });
  

  axios({
    method: "get",
    url: "/getUser",
    params: {
      id:id || ""
    },
    ...tokenConfig(getState)

  }).then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ fname, email, password,lname,address,phone,image }: IUser) => (
  dispatch: Dispatch<IAction>
) => {
  // Headers
  

  // Request body
  const data = JSON.stringify({ fname, email, password,lname,address,phone,image });

  axios({
    method: "post",
    url: "/signup",
    data,
    headers: {
      'Content-type': 'application/json'
    }
    // headers: tokenConfig(getState)

  })
    // .post('/api/auth/register', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const editUser = ({ fname, email, password, lname, address, phone, image, _id }: IUser) => (
  dispatch: Dispatch<IAction>,getState: Function
) => {
  // Headers
  

  // Request body
  const data = JSON.stringify({ fname, email, password, lname, address, phone, image, userId :_id});

  axios({
    method: "post",
    url: "/editUser",
    data,
    ...tokenConfig(getState)

  })
    // .post('/api/auth/register', body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }: IUser) => (
  dispatch: Dispatch<IAction>
) => {
  // Headers
  

  // Request body
  const data = JSON.stringify({ email, password });

  axios({
    method: "post",
    url: "/login",
    data,
    headers: {
      'Content-type': 'application/json'
    }

    // headers: tokenConfig(getState)

  })
    // .post('/api/auth/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.data, err.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config: IConfigHeaders = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['authorization'] = token;
  }

  return config;
};
