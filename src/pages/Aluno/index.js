import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { loginFailure } from '../../store/modules/auth/reducer';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading/index';
import axios from '../../services/axios';

export default function Aluno() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      setIsloading(true);
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setEmail(data.email);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          navigate('/');
        }
      }
      setIsloading(false);
    }

    getData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let haveError = false;

    if (nome.length < 3 || nome.length > 255) {
      haveError = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      haveError = true;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      haveError = true;
      toast.error('Email inválido');
    }

    if (!isInt(String(idade))) {
      haveError = true;
      toast.error('Idade inválida');
    }

    if (!isFloat(String(altura))) {
      haveError = true;
      toast.error('Altura inválida');
    }

    if (!isFloat(String(peso))) {
      haveError = true;
      toast.error('Peso inválido');
    }

    if (haveError) return;

    setIsloading(true);
    try {
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          idade,
          peso,
          altura,
          email,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          idade,
          peso,
          altura,
          email,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        navigate(`/aluno/${data.id}/edit`);
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) {
        dispatch(loginFailure());
      }
    }
    setIsloading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar aluno' : 'Novo Aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img crossOrigin="anonymous" src={foto} alt={nome} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />

        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="sobrenome"
        />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          type="text"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="idade"
        />

        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="peso"
        />

        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
