import React from 'react';
import { mockWords } from '../mock/mockData';
import { mockDecks } from '../mock/mockData';
import { FooterLicense } from '../components/FooterLicense';
import { useSearchParams } from 'react-router';

export function DictionaryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const searchedWords = mockWords.filter((word) =>
    word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          placeholder="Cari deck di sini..."
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
                {mockDecks
                  .filter((deck) => deck.words.includes(word.id))
                  .map((deck) => (
                    <p key={deck.id}>{deck.title}</p>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      <FooterLicense />
    </article>
  );
}
