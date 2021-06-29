import axios from './axios';
import { GET_USERS, DELETE_USER, EDIT_USER, USERS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IAction, IUser } from '../../types/interfaces';
import { Dispatch } from 'redux';

export const getUsers =
  () => (dispatch: Dispatch<IAction>, getState: Function) => {
    dispatch(setItemsLoading());
    axios({
      method: 'get',
      url: '/getUserList',
      ...tokenConfig(getState),
    })
      // .get('/api/items')
      .then((res) =>
        dispatch({
          type: GET_USERS,
          payload: res,
        })
      )
      .catch((err) => dispatch(returnErrors({ msg: err.data?.message }, err.status)));
  };

export const editAdmUser =
  ({
    firstName,
    email,
    lastName,
    Address,
    mobileNumber,
    userImage,
    _id,
  }: IUser) =>
    (dispatch: Dispatch<IAction>, getState: Function) => {
      const data = JSON.stringify({
        firstName,
        email,
        lastName,
        Address,
        mobileNumber,
        userImage,
        userId: _id,
      });

      axios({
        method: 'post',
        url: '/editUser',
        data,
        ...tokenConfig(getState),
      })
        // .post('/api/user', user, tokenConfig(getState))
        .then((res: any) => {
          dispatch({
            type: EDIT_USER,
            payload: res?.user,
          });

          dispatch(returnErrors({ msg: 'User edited successfully' }, 200));
        })
        .catch((err) => dispatch(returnErrors({ msg: err.data?.message }, err.status)));
    };

export const getUserAdmById =
  (_id: string) => (dispatch: Dispatch<IAction>, getState: Function) => {
    axios({
      method: 'get',
      url: '/getUser',
      params: {
        _id: _id || '',
      },
      ...tokenConfig(getState),
    })
      // .delete(`/api/items/${id}`, tokenConfig(getState))
      .then((res: any) => {
        dispatch({
          type: EDIT_USER,
          payload: res?.user,
        });

        dispatch(returnErrors({ msg: 'User loaded successfully' }, 200));
      })
      .catch((err) => dispatch(returnErrors({ msg: err.data?.message }, err.status)));
  };

export const deleteUser =
  (_id: string) => (dispatch: Dispatch<IAction>, getState: Function) => {
    axios({
      method: 'get',
      url: '/deleteUser',
      params: { _id },
      ...tokenConfig(getState),
    })
      // .delete(`/api/items/${id}`, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: DELETE_USER,
          payload: _id,
        })
      )
      .catch((err) => dispatch(returnErrors({ msg: err.data?.message }, err.status)));
  };

export const setItemsLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
