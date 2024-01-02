import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ isClosed, prevPath }) {
  const isLoggedIn = useSelector(
    (state) => state.persistedReducer.authReducer.value.isLoggedIn
  );

  if (isClosed && !isLoggedIn) {
    return <Navigate to="/login" state={prevPath} replace />;
  }

  return <Outlet />;
}

ProtectedRoute.defaultProps = {
  isClosed: false,
  prevPath: '',
};

ProtectedRoute.propTypes = {
  isClosed: PropTypes.bool,
  prevPath: PropTypes.string,
};
