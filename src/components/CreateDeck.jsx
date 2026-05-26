import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useWords from '../hooks/getWords';
import LoadingPage from '../pages/LoadingPage';
import useCreateDeck from '../hooks/useCreateDeck';

export default function CreateDeck() {
  const { data, loading, error, observerRef } = useWords();
  const {
    checkedWords,
    setCheckedWords,
    deckTitle,
    setDeckTitle,
    deckDescription,
    setDeckDescription,
    submitLoading,
    submitError,
    handleSubmit,
  } = useCreateDeck();

  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    setCheckedWords([]);
    setDeckTitle('');
    setDeckDescription('');
    navigate('/decks');
  };
  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedWords((prev) => [...prev, id]);
    } else {
      setCheckedWords((prev) => prev.filter((item) => item !== id));
    }
  };
  if (loading && data.length === 0) {
    return <LoadingPage />;
  }
  if (error) {
    return (
      <>
        <h2>{error}</h2>
      </>
    );
  }

  return (
    <>
      <h2>Buat Deck {deckTitle}</h2>
      <form className="deck-edit-inputs">
        <label htmlFor="deck-title">Judul Deck</label>
        <input
          maxLength={30}
          required
          value={deckTitle}
          onChange={(e) => {
            setDeckTitle(e.target.value);
          }}
          disabled={submitLoading}
          type="text"
          id="deck-title"
        />
        <label htmlFor="deck-description">Deskripsi Deck</label>
        <textarea
          maxLength={200}
          required
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
          id="deck-description"
        ></textarea>
        <p>Total kata: {checkedWords.length}</p>
        {!!submitError && <p style={{ color: '#fa5f51' }}>{submitError}</p>}
        <button
          onClick={(e) => handleSubmit(e)}
          className="deck-edit-submit-button"
          type="submit"
          disabled={submitLoading}
        >
          Simpan
        </button>
        <button
          onClick={(e) => {
            handleCancel(e);
          }}
          disabled={submitLoading}
          className="deck-cancel-edit"
          type="button"
        >
          Batal
        </button>
      </form>

      <table className="deck-edit-words-list">
        <caption>Silahkan pilih kata yang ingin anda masukan ke deck</caption>
        <thead>
          <tr>
            <th>No.</th>
            <th>Kanji</th>
            <th>Furigana</th>
            <th>Romaji</th>
            <th>Arti</th>
            <th>Masukan ke deck?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((w, i) => (
            <tr key={w.id}>
              <td>{i + 1}</td>
              <td>{w.kanji ? w.kanji : w.reading}</td>
              <td>{w.reading}</td>
              <td>{w.romaji}</td>
              <td>{w.meaning}</td>
              <td>
                <input
                  onChange={(e) => {
                    handleCheckboxChange(e, w.id);
                  }}
                  checked={checkedWords.includes(w.id)}
                  type="checkbox"
                  disabled={submitLoading}
                ></input>
              </td>
            </tr>
          ))}
          <tr ref={observerRef}>
            <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
              {loading ? 'Memuat kata lainnya...' : 'Akhir dari daftar kata'}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
