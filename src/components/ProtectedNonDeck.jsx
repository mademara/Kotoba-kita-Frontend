import React from 'react';
import { Navigate } from 'react-router';
import useDetailDeck from '../hooks/getDetailDeck';
import LoadingPage from '../pages/LoadingPage';

const ProtectedNonDeck = ({ children }) => {
  const { data, deckWords, loading, error } = useDetailDeck();

  if (loading) {
    return <LoadingPage />;
  }
  if (
    error === 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
  ) {
    return (
      <article>
        <h2>{error}</h2>
      </article>
    );
  }
  if (error) {
    return <Navigate to="/404" replace />;
  }

  return React.cloneElement(children, { data, deckWords });
};

export default ProtectedNonDeck;
