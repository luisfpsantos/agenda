import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginFailure } from '../../store/modules/auth/reducer';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading/index';
import { Title, Form } from './styled';
import axios from '../../services/axios';

export default function Fotos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch {
        toast.error('Error ao obter imagem');
        navigate('/');
      }
      setIsLoading(false);
    };

    getData();
  }, [id, navigate]);

  const handleChange = async (e) => {
    const inputFoto = e.target.files[0];
    const fotoUrl = URL.createObjectURL(inputFoto);

    setFoto(fotoUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', inputFoto);

    setIsLoading(true);
    try {
      await axios.post('/fotos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Foto enviada com sucesso');
    } catch (err) {
      toast.error('Erro ao enviar foto');
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        dispatch(loginFailure());
      }
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img crossOrigin="anonymous" src={foto} alt="Foto" />
          ) : (
            'Selecionar'
          )}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
