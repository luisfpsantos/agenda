import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ isClosed, prevPath, children }) {
  const isLoggedIn = false;

  if (isClosed && !isLoggedIn) {
    return <Navigate to="/login" state={prevPath} replace />;
  }

  return children;
}

ProtectedRoute.defaultProps = {
  isClosed: false,
  prevPath: '',
};

ProtectedRoute.propTypes = {
  isClosed: PropTypes.bool,
  prevPath: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};
