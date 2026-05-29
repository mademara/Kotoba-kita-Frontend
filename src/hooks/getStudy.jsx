import React from 'react';
import { useState, useEffect } from 'react';
import { startStudy } from '../services/api';
import { useParams } from 'react-router';
export default function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [questionsDeckTitle, setQuestionsDeckTitle] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [freeDrill, setFreeDrill] = useState(true);

  const params = useParams();
  const choicedDeckId = Number(params.deckId);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function grabQuestions() {
      setLoading(true);
      try {
        const response = await startStudy(choicedDeckId);
        setQuestions([...response.words]);
        setFreeDrill(response.is_free_drill);
        setQuestionsDeckTitle(response.deck_title);
        setTotalQuestions(response.total);
      } catch (error) {
        if (error.response.status === 404) {
          setErrorMessage('Data tidak ditemukan (Error 404)');
        } else if (error.request) {
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
    grabQuestions();
  }, [choicedDeckId]);
  return {
    errorMessage,
    loading,
    questions,
    freeDrill,
    totalQuestions,
    questionsDeckTitle,
  };
}
