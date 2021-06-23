import {
  GET_USERS,
  EDIT_USER,
  DELETE_USER,
  USERS_LOADING
} from '../actions/types';
import { IAction, IUser } from '../../types/interfaces';

const initialState = {
  users: [],
  loading: false
};

interface IState {
  users: IUser[];
  loading: boolean
}

const userListReducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case EDIT_USER:
      return {
        ...state,
        users: [...state.users.filter(user => user.id !== action.payload.id), action.payload]
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default userListReducer