import React, { useState } from 'react';
import { createDeck } from '../services/api';
import { useNavigate } from 'react-router';

export default function useCreateDeck() {
  const navigate = useNavigate();
  //   {
  //   "title": "string",
  //   "description": "string",
  //   "word_ids": [
  //     2147483647
  //   ]
  // }
  const [checkedWords, setCheckedWords] = useState([]);
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deckTitle.trim()) {
      setSubmitError('Judul deck tidak boleh kosong.');
      return;
    }
    if (deckTitle.trim().length < 4) {
      setSubmitError('Judul deck tidak boleh kurang dari 4 karakter.');
      return;
    } else if (deckTitle.trim().length > 30) {
      setSubmitError('Judul terlalu panjang (maksimal 30 karakter).');
      return;
    }
    if (deckDescription.trim().length <= 0) {
      setSubmitError(
        'Deskripsi deck tidak boleh kosong (maksimal 200 karakter).'
      );
      return;
    } else if (deckDescription.trim().length > 200) {
      setSubmitError('Deskripsi terlalu panjang (maksimal 200 karakter).');
      return;
    }
    if (checkedWords.length < 10) {
      setSubmitError('Kamu harus memilih minimal 10 kata untuk deck ini.');
      return;
    }
    setSubmitError(null);
    setSubmitLoading(true);

    try {
      const payload = {
        title: deckTitle.trim(),
        description: deckDescription.trim(),
        word_ids: checkedWords,
      };
      await createDeck(payload);

      navigate('/decks');
    } catch (error) {
      if (error.request) {
        setSubmitError(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
        );
      } else {
        setSubmitError(`Terjadi kesalahan sistem: ${error.message}`);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    checkedWords,
    setCheckedWords,
    deckTitle,
    setDeckTitle,
    deckDescription,
    setDeckDescription,
    submitLoading,
    submitError,
    handleSubmit,
  };
}
