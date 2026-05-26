import React from 'react';
import { useState, useEffect } from 'react';
import { getDecks } from '../services/api';

// [
//   {
//     "id": 0,
//     "title": "string",
//     "description": "string",
//     "is_default": true,
//     "created_at": "2026-05-24T16:49:05.187Z",
//     "word_count": 0,
//     "due_count": 0
//   }
// ]

export default function useUserDecks() {
  const [decks, setDecks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function grabDecks() {
      setLoading(true);
      try {
        const response = await getDecks();
        setDecks([...response]);
      } catch (error) {
        if (error.request) {
          setErrorMessage(
            'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
          );
        } else {
          setErrorMessage(`Terjadi kesalahan sistem: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
    grabDecks();
  }, []);
  return {
    errorMessage,
    loading,
    decks,
  };
}
