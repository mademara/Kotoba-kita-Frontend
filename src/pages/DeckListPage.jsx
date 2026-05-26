import React, { useRef } from 'react';
import { FooterLicense } from '../components/FooterLicense';
import { formatIndonesianDate } from '../helper/formatIndonesianDate';
import { useNavigate, useSearchParams } from 'react-router';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import useUserDecks from '../hooks/getUserDecks';
import LoadingPage from './LoadingPage';
import useDeleteDeck from '../hooks/useDeleteDeck';

export function DeckListPage() {
  const { errorMessage, loading, decks } = useUserDecks();
  const modalRef = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const { deleteLoading, deleteError, handleDelete } = useDeleteDeck();

  const handleEdit = (id) => {
    navigate(`/decks/${id}/edit`);
  };
  const handleDetail = (id) => {
    navigate(`/decks/${id}`);
  };
  const handleAdd = () => {
    navigate('/decks/create');
  };

  if (loading) {
    return <LoadingPage />;
  }
  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }
  const searchedDecks = decks.filter((deck) =>
    deck.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {!!deleteError && <h2>{deleteError}</h2>}

      <section className="deck-list-container">
        {searchedDecks.length === 0 ? (
          <div className="deck-empty-state">
            <p>Ups! Deck yang kamu cari tidak ditemukan.</p>
            <p>
              Coba gunakan kata kunci lain atau buat deck kustom kamu sendiri!
              ✨
            </p>
          </div>
        ) : (
          <>
            {searchedDecks
              .filter((deckMixed) => deckMixed.is_default === true)
              .map((deckDefault) => (
                <div key={deckDefault.id} className="deck-default-container">
                  <div className="deck-header">
                    <h2>{deckDefault.title}</h2>
                    <div className="deck-tag">Default</div>
                  </div>
                  <p className="deck-created-at">
                    {formatIndonesianDate(deckDefault.created_at)}
                  </p>
                  <p>{deckDefault.word_count} Kata</p>
                  <p className="description-overflow">
                    {deckDefault.description}
                  </p>
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
              .filter((deckMixed) => deckMixed.is_default === false)
              .map((deck) => (
                <div key={deck.id} className="deck-container">
                  <div className="deck-header">
                    <h2>{deck.title}</h2>
                    <div className="deck-tag-custom">Custom</div>
                  </div>
                  <p className="deck-created-at">
                    {formatIndonesianDate(deck.created_at)}
                  </p>
                  <p>{deck.word_count} kata</p>
                  <p className="description-overflow">{deck.description}</p>
                  <div className="deck-container-button">
                    <button
                      onClick={() => modalRef.current.open(deck.id, deck.title)}
                      className="deck-list-buttons deck-delete-button"
                      disabled={deleteLoading}
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
          </>
        )}
      </section>
      <FooterLicense />
      <ConfirmDeleteModal ref={modalRef} onConfirm={handleDelete} />
    </article>
  );
}
