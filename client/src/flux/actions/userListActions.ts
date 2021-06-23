import axios from 'axios';
import { GET_USERS, EDIT_USER, DELETE_USER, USERS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IUser, IAction } from '../../types/interfaces';
import { Dispatch } from 'redux';


export const getUsers = () => (dispatch: Dispatch<IAction>) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editUsers = (user: IUser) => (
  dispatch: Dispatch<IAction>,
  getState: Function
) => {
  axios
    .post('/api/user', user, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EDIT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const getUserById = (id: string) => (
  dispatch: Dispatch<IAction>,
  getState: Function
) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EDIT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteUser = (id: string) => (
  dispatch: Dispatch<IAction>,
  getState: Function
) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: USERS_LOADING
  };
};
