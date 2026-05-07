import React from 'react';
import { FooterLicense } from '../components/FooterLicense';
import { deckWords } from '../mock/mockData';
import { NavLink } from 'react-router';
import { formatIndonesianDate } from '../helper/formatIndonesianDate';

export function DeckDetailPage({ deck }) {
  const wordsInDeck = deckWords(deck);

  return (
    <article className="deck-detail-page">
      <header className="deck-detail-container">
        <div className="deck-detail-title">
          <h2>{deck.title}</h2>
          <NavLink className={'deck-detail-back-button'} to={'/decks'}>
            Kembali
          </NavLink>
        </div>
        <div className="deck-detail-minor">
          <p className="deck-detail-created-date">
            {formatIndonesianDate(deck.createdAt)}
          </p>
          <p className="deck-detail-tag">
            {deck.isDefault ? 'Default' : 'Custom'}
          </p>
          <p> Jumlah kata: {deck.wordCount}</p>
        </div>
        <p className="deck-detail-description">{deck.description}</p>
      </header>

      <table className="deck-words-list">
        <caption>Daftar Kata </caption>
        <thead>
          <tr>
            <th>No.</th>
            <th>Kanji</th>
            <th>Furigana</th>
            <th>Romaji</th>
            <th>Arti</th>
            <th>Kategori</th>
          </tr>
        </thead>
        <tbody>
          {wordsInDeck.map((w, i) => (
            <tr key={w.id}>
              <td>{i + 1}</td>
              <td>{w.kanji ? w.kanji : w.reading}</td>
              <td>{w.reading}</td>
              <td>{w.romaji}</td>
              <td>{w.meaning}</td>
              <td>{w.pos}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FooterLicense />
    </article>
  );
}
