import { useRef, useState, useCallback } from 'react';
import { submitAnswer } from '../services/api';

function calcRating(ansId, correctId, answeringTime) {
  if (ansId !== correctId || answeringTime >= 20) return 'lupa';
  if (answeringTime <= 5) return 'ingat';
  if (answeringTime <= 10) return 'cukup ingat';
  return 'kesulitan';
}

function calcComment(rating, freeDrill) {
  const comments = {
    ingat: {
      freeDrill:
        'Luar biasa! Refleksmu cepat sekali dalam mode Free Drill ini.',
      study: 'Mantap, kamu hafal kata ini dengan baik.',
    },
    'cukup ingat': {
      freeDrill: 'Bagus! Kecepatan yang stabil untuk latihan bebas.',
      study:
        'Bagus, menurutku beberapa sesi lagi akan membuatmu hafal dengan kata ini.',
    },
    kesulitan: {
      freeDrill:
        'Butuh waktu sedikit lebih lama, tapi respons yang bagus untuk latihan ini.',
      study:
        'Sepertinya kamu hampir lupa kata ini, aku akan menjadwalkannya lebih sering.',
    },
    lupa: {
      freeDrill:
        'Tidak apa-apa, salah itu wajar. Di mode Free Drill ini kamu bebas mencoba lagi tanpa batas!',
      study:
        'Jangan patah semangat, aku akan membantumu menghafal kata ini, akan kujadwalkan dalam waktu dekat.',
    },
  };

  return comments[rating][freeDrill ? 'freeDrill' : 'study'];
}

export function useAnswerSubmit({
  currentCard,
  timer,
  freeDrill,
  stopTimer,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('Apa arti dari kanji/furigana ini?');
  const [pendingAnswer, setPendingAnswer] = useState(null);

  const isSubmitting = useRef(false);

  const handleAnswer = useCallback(
    async (ansId, ans) => {
      if (isSubmitting.current) return;
      isSubmitting.current = true;

      setPendingAnswer({ ansId, ans });
      stopTimer();
      setLoading(true);

      const payload = {
        question_word_id: currentCard.id,
        answered_word_id: ansId,
        response_time_seconds: timer,
      };

      try {
        await submitAnswer(payload);

        const answeringTime = 20 - timer;
        const newRating = calcRating(ansId, currentCard.id, answeringTime);
        const newComment = calcComment(newRating, freeDrill);

        setAnswer(ans);
        setRating(newRating);
        setComment(newComment);
        onSuccess();
      } catch (error) {
        isSubmitting.current = false;

        if (error.request) {
          setComment('Koneksi bermasalah. Coba jawab lagi.');
        } else {
          setComment('Ada kesalahan sistem. Coba jawab lagi.');
        }
      } finally {
        setLoading(false);
      }
    },
    [currentCard, timer, freeDrill, stopTimer, onSuccess]
  );

  const reset = useCallback(() => {
    setPendingAnswer(null);
    setAnswer('');
    setRating('');
    setComment('Apa arti dari kanji/kana ini?');
    isSubmitting.current = false;
  }, []);

  return {
    loading,
    answer,
    rating,
    comment,
    pendingAnswer,
    handleAnswer,
    reset,
  };
}
