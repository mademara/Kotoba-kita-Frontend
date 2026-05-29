import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import ConfirmEditModal from './ConfirmEditModal';
import useWords from '../hooks/getWords';
import { updateDeck } from '../services/api';

export default function EditDeck({ currentDeck = {}, wordList = [] }) {
  const [checkedWords, setCheckedWords] = useState(
    wordList?.map((w) => w.id) || []
  );
  const { data, loading, error, observerRef } = useWords();
  const modalRef = useRef();
  const [deckTitle, setDeckTitle] = useState(currentDeck.title);
  const [deckDescription, setDeckDescription] = useState(
    currentDeck.description
  );
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  const navigate = useNavigate();

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    modalRef.current.open(currentDeck);
  };
  const handleSubmit = async (currDeck) => {
    setEditLoading(true);
    setEditError(null);
    try {
      const payload = {
        title: deckTitle,
        description: deckDescription,
        word_ids: checkedWords,
      };
      await updateDeck(currDeck.id, payload);
      await navigate('/decks');
    } catch (error) {
      if (error.request) {
        setEditError(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
        );
      } else {
        setEditError(`Terjadi kesalahan sistem: ${error.message}`);
      }
    } finally {
      setEditLoading(false);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    //logika reset input
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
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Edit Deck {currentDeck.title}</h2>
      <form className="deck-edit-inputs">
        <label htmlFor="deck-title">Judul Deck</label>
        <input
          maxLength={30}
          value={deckTitle}
          onChange={(e) => {
            setDeckTitle(e.target.value);
          }}
          type="text"
          id="deck-title"
        />
        <label htmlFor="deck-description">Deskripsi Deck</label>
        <textarea
          maxLength={200}
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
          id="deck-description"
        ></textarea>
        <p>Total kata: {checkedWords.length}</p>
        {!!editError && <p style={{ color: '#fa5f51' }}>{editError}</p>}
        <button
          onClick={(e) => handleConfirmEdit(e)}
          className="deck-edit-submit-button"
          type="submit"
          disabled={editLoading}
        >
          Simpan
        </button>
        <button
          onClick={(e) => {
            handleCancel(e);
          }}
          className="deck-cancel-edit"
          type="button"
          disabled={editLoading}
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
                  disabled={editLoading}
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
      <ConfirmEditModal ref={modalRef} onConfirm={handleSubmit} />
    </>
  );
}
