import React from 'react';
import { useNavigate } from 'react-router';

import useUserDecks from '../hooks/getUserDecks';
import { FooterLicense } from '../components/FooterLicense';
import LoadingPage from './LoadingPage';

export default function StudyDeckChoicePage() {
  const { errorMessage, loading, decks } = useUserDecks();
  const navigate = useNavigate();
  const handleChoiceDeck = (deckId) => {
    navigate(`/study/${deckId}`);
  };
  const handleShowDeckDetail = (deckId) => {
    navigate(`/decks/${deckId}`);
  };
  if (loading) {
    return <LoadingPage />;
  }
  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  return (
    <article className="deck-choice-page">
      <h2>Mau belajar dengan deck yang mana nih?</h2>
      <section className="deck-choice">
        {decks.map((deck) => (
          <div key={deck.id} className="deck-choice-format">
            <h2>{deck.title}</h2>
            <p>{deck.due_count} kata perlu diulas</p>
            <p>Total {deck.word_count} kata</p>
            <p className="description-overflow">{deck.description}</p>
            <div className="deck-choice-button-container">
              <button onClick={() => handleChoiceDeck(deck.id)}>
                Pakai Deck ini!
              </button>
              <button onClick={() => handleShowDeckDetail(deck.id)}>
                Lihat Detail Deck
              </button>
            </div>
          </div>
        ))}
      </section>
      <FooterLicense />
    </article>
  );
}
