import React from 'react';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Register from '../pages/Register';
import Fotos from '../pages/Fotos';
import Page404 from '../pages/page404';
import Header from '../components/Header';

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function PageError() {
  return (
    <>
      <Header />
      <Page404 />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<PageError />}>
      <Route path="/" element={<Alunos />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
      <Route element={<ProtectedRoute isClosed />}>
        <Route path="/aluno/:id/edit" element={<Aluno />} />
        <Route path="/aluno/" element={<Aluno />} />
        <Route path="/fotos/:id" element={<Fotos />} />
      </Route>
    </Route>
  )
);

export default function Routes() {
  return <RouterProvider router={router} />;
}
