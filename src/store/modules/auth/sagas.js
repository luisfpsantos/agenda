import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerCreatedSuccess,
  registerUpdatedSuccess,
} from './reducer';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens/', payload);
    yield put(loginSuccess({ ...response.data }));
    toast.success('Login efetuado com sucesso!');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    payload.navigate('/');
  } catch (e) {
    toast.error('Usuário ou senha inválidos');
    yield put(loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'authReducer.value.token');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso!');
      yield put(registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta criada com sucesso!');
      yield put(registerCreatedSuccess());
      payload.navigate('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente');
      yield put(loginFailure());
      return payload.navigate('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(registerFailure());
  }
}

export default all([
  takeLatest('auth/loginRequest', loginRequest),
  takeLatest('persist/REHYDRATE', persistRehydrate),
  takeLatest('auth/registerRequest', registerRequest),
]);
