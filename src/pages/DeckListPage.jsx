import React, { useRef } from 'react';
import { FooterLicense } from '../components/FooterLicense';
import { mockDecks } from '../mock/mockData';
import { formatIndonesianDate } from '../helper/formatIndonesianDate';
import { useNavigate, useSearchParams } from 'react-router';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

export function DeckListPage() {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const searchedDecks = mockDecks.filter((deck) =>
    deck.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    //logika hapus
  };
  const handleEdit = (id) => {
    navigate(`/decks/${id}/edit`);
  };
  const handleDetail = (id) => {
    navigate(`/decks/${id}`);
  };
  const handleAdd = () => {
    navigate('/decks/create');
  };
  return (
    <article className="deck-list-page">
      <header className="deck-list-page-header">
        <h2>Daftar Deck yang tersedia</h2>
        <button onClick={handleAdd} className="deck-list-add-deck">
          Tambah deck
        </button>
        <input
          maxLength={30}
          className="searchbar-input"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchParams({ search: e.target.value })}
          placeholder="Cari deck di sini..."
        />
      </header>
      <section className="deck-list-container">
        {searchedDecks
          .filter((deckMixed) => deckMixed.isDefault === true)
          .map((deckDefault) => (
            <div key={deckDefault.id} className="deck-default-container">
              <div className="deck-header">
                <h2>{deckDefault.title}</h2>
                <div className="deck-tag">Default</div>
              </div>
              <p className="deck-created-at">
                {formatIndonesianDate(deckDefault.createdAt)}
              </p>
              <p>{deckDefault.wordCount} Kata</p>
              <p>{deckDefault.description}</p>
              <div className="deck-container-button">
                <button
                  className="deck-list-buttons"
                  onClick={() => {
                    handleDetail(deckDefault.id);
                  }}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}

        {searchedDecks
          .filter((deckMixed) => deckMixed.isDefault === false)
          .map((deck) => (
            <div key={deck.id} className="deck-container">
              <div className="deck-header">
                <h2>{deck.title}</h2>
                <div className="deck-tag-custom">Custom</div>
              </div>
              <p className="deck-created-at">
                {formatIndonesianDate(deck.createdAt)}
              </p>
              <p>{deck.wordCount} kata</p>
              <p>{deck.description}</p>
              <div className="deck-container-button">
                <button
                  onClick={() => modalRef.current.open(deck.id)}
                  className="deck-list-buttons deck-delete-button"
                >
                  Hapus
                </button>
                <button
                  className="deck-list-buttons"
                  onClick={() => {
                    handleEdit(deck.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="deck-list-buttons"
                  onClick={() => {
                    handleDetail(deck.id);
                  }}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
      </section>
      <FooterLicense />
      <ConfirmDeleteModal ref={modalRef} onConfirm={handleDelete} />
    </article>
  );
}
