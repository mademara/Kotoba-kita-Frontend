import React from 'react';
import { FooterLicense } from '../components/FooterLicense';

import { NavLink } from 'react-router';
import { formatIndonesianDate } from '../helper/formatIndonesianDate';

// deckId: response.id,
// deckTitle: response.title,
// deckDescription: response.description,
// isDefault: response.is_default,
// createdAt: response.created_at,
// wordCount: response.word_count,
// dueCount: response.due_count,
export function DeckDetailPage({ data, deckWords }) {
  return (
    <article className="deck-detail-page">
      <header className="deck-detail-container">
        <div className="deck-detail-title">
          <h2>{data.title}</h2>
          <NavLink className={'deck-detail-back-button'} to={'/decks'}>
            Kembali
          </NavLink>
        </div>
        <div className="deck-detail-minor">
          <p className="deck-detail-created-date">
            {formatIndonesianDate(data.created_at)}
          </p>
          <p className="deck-detail-tag">
            {data.is_default ? 'Default' : 'Custom'}
          </p>
          <p> Jumlah kata: {data.word_count}</p>
          <p> Kata siap diulas: {data.due_count} </p>
        </div>
        <p className="deck-detail-description">{data.description}</p>
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
          {deckWords.map((w, i) => (
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
// {
//   "id": 0,
//   "title": "string",
//   "description": "string",
//   "is_default": true,
//   "created_at": "2026-05-24T16:06:12.237Z",
//   "word_count": 0,
//   "due_count": 0,
//   "words": [
//     {
//       "id": 2147483647,
//       "kanji": "string",
//       "reading": "string",
//       "romaji": "string",
//       "meaning": "string",
//       "pos": "string",
//       "decks": "string"
//     }
//   ]
// }
