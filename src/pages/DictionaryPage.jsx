import React from 'react';
import { FooterLicense } from '../components/FooterLicense';
import { useSearchParams } from 'react-router';
import useWords from '../hooks/getWords';

export function DictionaryPage() {
  const { data, loading, error, observerRef } = useWords();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const searchedWords = data.filter((word) =>
    word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (error) {
    return <h2>{error}</h2>;
  }
  // [
  //   {
  //     "id": 2147483647,
  //     "kanji": "string",
  //     "reading": "string",
  //     "romaji": "string",
  //     "meaning": "string",
  //     "pos": "string",
  //     "decks": "string"
  //   }
  // ]
  return (
    <article className="dict-page">
      <header className="deck-list-page-header">
        <h2>Daftar Kata yang tersedia</h2>
        <input
          maxLength={30}
          className="searchbar-input-word-list"
          value={searchTerm}
          onChange={(e) => setSearchParams({ search: e.target.value })}
          type="search"
          placeholder="Cari Kata di sini..."
        />
      </header>
      <section className="dict-page-words-list">
        {searchedWords.map((word) => (
          <div key={word.id} className="word-flip-card">
            <div className="word-flip-card-inner">
              <div className="word-flip-card-front">
                <div className="word-flip-card-japanese">
                  <h3>{word.kanji ? word.kanji : word.reading}</h3>
                  <p>{word.reading}</p>
                  <p>{word.romaji}</p>
                </div>
                <p className="word-flip-card-menaing">{word.meaning}</p>
              </div>

              <div className="word-flip-card-back">
                <div className="word-flip-card-indonesian">
                  <h3>{word.meaning}</h3>
                </div>
                <p>kata ini tersedia pada deck:</p>
                {word.decks.map((deck) => (
                  <p key={deck.id}>{deck.title}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      <div ref={observerRef}>
        <div colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
          {loading ? 'Memuat kata lainnya...' : 'Akhir dari daftar kata'}
        </div>
      </div>
      <FooterLicense />
    </article>
  );
}
