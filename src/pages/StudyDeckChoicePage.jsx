import React from 'react';
import { useNavigate } from 'react-router';
import { mockDecks } from '../mock/mockData';
import { FooterLicense } from '../components/FooterLicense';

export default function StudyDeckChoicePage() {
  const navigate = useNavigate();
  const handleChoiceDeck = (deckId) => {
    navigate(`/study/${deckId}`);
  };

  return (
    <article className="deck-choice-page">
      <h2>Mau belajar dengan deck yang mana nih?</h2>
      <section className="deck-choice">
        {mockDecks.map((deck) => (
          <div key={deck.id} className="deck-choice-format">
            <h2>{deck.title}</h2>
            <p>{deck.wordCount} kata</p>
            <p>{deck.description}</p>
            <div className="deck-choice-button-container">
              <button onClick={() => handleChoiceDeck(deck.id)}>
                Pakai Deck ini!
              </button>
              <button>Lihat Detail Deck</button>
            </div>
          </div>
        ))}
      </section>
      <FooterLicense />
    </article>
  );
}
