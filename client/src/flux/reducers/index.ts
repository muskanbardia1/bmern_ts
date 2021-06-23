import { combineReducers } from 'redux';
import userListReducer from './userListReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

 const rootreducer=combineReducers({
  // item: itemReducer,
  error: errorReducer,
   auth: authReducer,
  userList:userListReducer
});

export default rootreducer
export type IRootState=ReturnType<typeof rootreducer>
