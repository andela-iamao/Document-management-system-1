import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../actionTypes';

const userGetSuccess = (users) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    users
  };
};

export const viewUsers = (userId) => {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    axios.get('/users', {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      dispatch(userGetSuccess(response.data));
    })
    .catch((err) => {
    });
  };
};
