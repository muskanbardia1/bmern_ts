import axios from './axios';
import { GET_USERS, DELETE_USER, USERS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import {  IAction } from '../../types/interfaces';
import { Dispatch } from 'redux';


export const getUsers = () => (dispatch: Dispatch<IAction>, getState: Function) => {
  dispatch(setItemsLoading());
  axios({
    method: "get",
    url: "/getUserList",
    ...tokenConfig(getState)

  })
    // .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.data, err.status))
    );
};

// export const editUsers = (user: IUser) => (
//   dispatch: Dispatch<IAction>,
//   getState: Function
// ) => {
//   axios({
//     method: "get",
//     url: "",
//     ...tokenConfig(getState)

//   })
//     // .post('/api/user', user, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: EDIT_USER,
//         payload: res
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.data, err.status))
//     );
// };


// export const getUserById = (id: string) => (
//   dispatch: Dispatch<IAction>,
//   getState: Function
// ) => {
//   axios({
//     method: "get",
//     url: "",
//     ...tokenConfig(getState)

//   })
//     // .delete(`/api/items/${id}`, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: EDIT_USER,
//         payload: res
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.data, err.status))
//     );
// };

export const deleteUser = (id: string) => (
  dispatch: Dispatch<IAction>,
  getState: Function
) => {
  axios({
    method: "get",
    url: "",
    ...tokenConfig(getState)

  })
    // .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.data, err.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: USERS_LOADING
  };
};
