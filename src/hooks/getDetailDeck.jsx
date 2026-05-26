import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDeckDetail } from '../services/api';

export default function useDetailDeck() {
  const [data, setData] = useState(null);
  const [deckWords, setDeckWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const choicedDeckId = Number(params.deckId);

  useEffect(() => {
    async function grabDetails() {
      setLoading(true);
      try {
        const response = await getDeckDetail(choicedDeckId);
        setData(response);
        setDeckWords(response.words);
      } catch (error) {
        if (error.request) {
          setError(
            'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
          );
        } else if (error.response.status === 404) {
          setError('Data tidak ditemukan (Error 404)');
        } else {
          setError(`Terjadi kesalahan sistem: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
    grabDetails();
  }, [choicedDeckId]);
  return { data, deckWords, loading, error };
}
