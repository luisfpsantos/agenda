/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {
      isLoggedIn: false,
      token: false,
      user: {},
      isLoading: false,
    },
  },
  reducers: {
    loginRequest(state) {
      state.value.isLoading = true;
      return state;
    },

    loginSuccess(state, action) {
      state.value.isLoading = false;
      state.value.isLoggedIn = true;
      state.value.token = action.payload.token;
      state.value.user = action.payload.user;
      return state;
    },

    loginFailure(state) {
      state.value.isLoggedIn = false;
      state.value.token = false;
      state.value.user = {};
      state.value.isLoading = false;
      delete axios.defaults.headers.Authorization;
      return state;
    },

    registerRequest(state) {
      state.value.isLoading = true;
      return state;
    },

    registerFailure(state) {
      state.value.isLoading = false;
      return state;
    },

    registerUpdatedSuccess(state, action) {
      state.value.isLoading = false;
      state.value.user.nome = action.payload.nome;
      state.value.user.email = action.payload.email;
      return state;
    },

    registerCreatedSuccess(state) {
      state.value.isLoading = false;
      return state;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerFailure,
  registerUpdatedSuccess,
  registerCreatedSuccess,
} = authSlice.actions;

export default authSlice.reducer;
