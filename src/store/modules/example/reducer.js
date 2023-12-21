import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    value: 'estado inicial',
  },
  reducers: {
    clicaBotao: actions.clicaBotaoAction,
    botaoErro: actions.botaoFailureAction,
    botaoSucesso: actions.botaoSuccessAction,
  },
});

export const { clicaBotao, botaoErro, botaoSucesso } = exampleSlice.actions;

export default exampleSlice.reducer;
