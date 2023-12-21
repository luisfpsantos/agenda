import React from 'react';
import { useDispatch } from 'react-redux';
import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';
import { clicaBotao } from '../../store/modules/example/reducer';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(event) {
    event.preventDefault();

    dispatch(clicaBotao());
  }

  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragrafo>Lorem ipsum dolor sit amet.</Paragrafo>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
