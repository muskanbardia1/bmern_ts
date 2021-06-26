import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

import { IUserRedux, actionTypes, IUser } from "../../types/interfaces"

interface IPayload{
   user: IUser, token ?: string 
}
interface IAction {
  type: actionTypes;
  payload: IPayload;
}

const initialState: IUserRedux = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: localStorage.getItem('token'), 
};

const userReducer = (state = initialState, action: IAction): IUserRedux => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token||"");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null
      };
    default:
      return state;
  }
}


export default userReducer