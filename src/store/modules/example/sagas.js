/* eslint-disable no-unused-vars */
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { botaoSucesso, botaoErro, clicaBotao } from './reducer';

const requisicao = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(requisicao);
    yield put(botaoSucesso());
  } catch (e) {
    toast.error('Deu erro');
    yield put(botaoErro());
  }
}

export default all([takeLatest('example/clicaBotao', exampleRequest)]);
