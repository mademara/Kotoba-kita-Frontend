import React from 'react';
import { FooterLicense } from '../components/FooterLicense';
import { useParams, Navigate } from 'react-router';
import { mockDecks } from '../mock/mockData';
import EditDeck from '../components/EditDeck';

export default function DeckEditPage() {
  const { deckId } = useParams();
  const currentDeck = mockDecks.find((deck) => deck.id === Number(deckId));

  if (!currentDeck || currentDeck.isDefault) {
    return <Navigate to="/404" replace />;
  } else {
    return (
      <article className="deck-edit-page">
        <EditDeck currentDeck={currentDeck} />
        <FooterLicense />
      </article>
    );
  }
}
