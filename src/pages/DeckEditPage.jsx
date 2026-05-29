import React from 'react';
import { FooterLicense } from '../components/FooterLicense';
import { Navigate } from 'react-router';

import EditDeck from '../components/EditDeck';
import useDetailDeck from '../hooks/getDetailDeck';
import LoadingPage from './LoadingPage';

export default function DeckEditPage() {
  const { data, deckWords, loading, error } = useDetailDeck();

  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  if (!data || data.isDefault) {
    return <Navigate to="/404" replace />;
  } else {
    return (
      <article className="deck-edit-page">
        <EditDeck currentDeck={data} wordList={deckWords} />
        <FooterLicense />
      </article>
    );
  }
}
