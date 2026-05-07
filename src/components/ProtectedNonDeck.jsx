import React from 'react';
import { Navigate, useParams } from 'react-router';
import { mockDecks } from '../mock/mockData';

const ProtectedNonDeck = ({ children }) => {
  // implementasi auth nanti
  const params = useParams();
  const deck = mockDecks.find((deck) => deck.id === Number(params.deckId));

  if (!deck) {
    return <Navigate to="/404" replace />;
  }

  return React.cloneElement(children, { deck });
};

export default ProtectedNonDeck;
