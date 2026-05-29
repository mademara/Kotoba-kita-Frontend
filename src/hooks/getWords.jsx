import { useState, useEffect, useRef, useCallback } from 'react';
import { getWords } from '../services/api';

export default function useWords() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Default false, diubah true saat fetch
  const [error, setError] = useState(null);
  const [next, setNext] = useState('/api/words/?page=1');

  const observerRef = useRef(null);

  const isFetching = useRef(false);

  const grabWords = useCallback(async () => {
    if (isFetching.current || !next) return;

    isFetching.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await getWords(next);

      const nextData = response.results || [];
      setData((prevData) => [...prevData, ...nextData]);

      if (response.next) {
        const url = new URL(response.next);
        const route = url.pathname + url.search;
        setNext(route);
      } else {
        setNext(null);
      }
    } catch (error) {
      if (error.request) {
        setError(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
        );
      } else if (error.response && error.response.status === 404) {
        setError('Data tidak ditemukan (Error 404)');
      } else {
        setError(`Terjadi kesalahan sistem: ${error.message}`);
      }
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [next]);

  useEffect(() => {
    const currentRef = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next && !loading) {
          grabWords();
        }
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [next, loading, grabWords]);

  return { data, loading, error, observerRef };
}
