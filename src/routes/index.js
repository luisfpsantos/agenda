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
import Page404 from '../pages/page404';
import Header from '../components/header';

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
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

export default function Routes() {
  return <RouterProvider router={router} />;
}
