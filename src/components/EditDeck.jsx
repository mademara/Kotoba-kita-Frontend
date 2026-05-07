import React, { useRef, useState } from 'react';
import { mockWords } from '../mock/mockData';
import { useNavigate } from 'react-router';
import ConfirmEditModal from './ConfirmEditModal';

export default function EditDeck({ currentDeck = {} }) {
  const [checkedWords, setCheckedWords] = useState(() => {
    return currentDeck ? currentDeck.words : [];
  });
  const modalRef = useRef();
  const [deckTitle, setDeckTitle] = useState(currentDeck.title);
  const [deckDescription, setDeckDescription] = useState(
    currentDeck.description
  );
  const navigate = useNavigate();

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    modalRef.current.open(currentDeck);
  };
  const handleSubmit = (currDeck) => {
    // logika simpan dan reset input
    navigate('/decks');
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
        <button
          onClick={(e) => handleConfirmEdit(e)}
          className="deck-edit-submit-button"
          type="submit"
        >
          Simpan
        </button>
        <button
          onClick={(e) => {
            handleCancel(e);
          }}
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
          {mockWords.map((w, i) => (
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
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmEditModal ref={modalRef} onConfirm={handleSubmit} />
    </>
  );
}
