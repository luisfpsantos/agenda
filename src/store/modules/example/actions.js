/* eslint-disable no-unused-vars */
export function clicaBotaoAction(state) {
  console.log('Estou fazendo a requisição');
  return state;
}

export function botaoSuccessAction(state) {
  console.log('Sucesso');
  return state;
}

export function botaoFailureAction(state) {
  console.log('Deu erro =(');
  return state;
}
