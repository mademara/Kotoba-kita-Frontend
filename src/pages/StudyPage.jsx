import React, { useEffect, useState } from 'react';
import { FooterLicense } from '../components/FooterLicense';
import { mockFlashcardSession } from '../mock/mockData';
import { useNavigate } from 'react-router';

export function StudyPage() {
  const [answer, setAnswer] = useState('');
  const [currentCardEnum, setCurrentCardEmun] = useState(0);
  const [timer, setTimer] = useState(20);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const currentCard = mockFlashcardSession.words[currentCardEnum];
  const [rating, setRating] = useState('');
  const [answerReady, setAnswerReady] = useState(false);
  const [summary, setSummary] = useState([]);
  const [devComment, setDevComment] = useState('Apa arti dari kanji/kana ini?');
  const navigate = useNavigate();

  const handleAnswer = (ansId, ans) => {
    if (answerReady) return;
    setIsTimerActive(false);
    const answeringTime = 20 - timer;
    setAnswer(ans);
    if (ansId === currentCard.id && answeringTime < 20) {
      if (answeringTime <= 5) {
        setRating('ingat');
        setDevComment('Mantap, kamu hafal kata ini dengan baik.');
      } else if (answeringTime <= 10) {
        setRating('cukup ingat');
        setDevComment(
          'Bagus, menurutku beberapa sesi lagi akan membuatmu hafal dengan kata ini.'
        );
      } else if (answeringTime < 20) {
        setRating('kesulitan');
        setDevComment(
          'Sepertinya kamu hampir lupa kata ini, aku akan menjadwalkannya lebih sering.'
        );
      }
    } else if (answeringTime === 20 || ansId !== currentCard.id) {
      setRating('lupa');
      setDevComment(
        'Jangan patah semangat, aku akan membantumu menghafal kata ini, akan kujadwalkan dalam waktu dekat.'
      );
    }
    setAnswerReady(true);
  };
  const handleNextCard = () => {
    const currentCardSummary = {
      id: currentCard.id,
      kanji: currentCard.kanji ? currentCard.kanji : currentCard.reading,
      reading: currentCard.reading,
      romaji: currentCard.romaji,
      meaning: currentCard.choices.find(
        (choice) => choice.wordId === currentCard.id
      ).meaning,
      rating: rating,
    };
    setDevComment('Apa arti dari kanji/kana ini?');
    const updatedSummary = [...summary, currentCardSummary];

    if (currentCardEnum === mockFlashcardSession.words.length - 1) {
      setSummary(updatedSummary);
      setAnswerReady(false);
      setAnswer('');
      setRating('');

      navigate('/study/result', { state: updatedSummary });
    } else {
      setSummary(updatedSummary);
      setAnswerReady(false);
      setAnswer('');
      setRating('');
      setCurrentCardEmun((prev) => prev + 1);
      setTimer(20);
      setIsTimerActive(true);
    }
  };
  if (timer <= 0 && answerReady === false) {
    handleAnswer(0, 'Unanswered');
  }
  useEffect(() => {
    if (!isTimerActive || timer <= 0 || answerReady) return;

    const intervalId = setInterval(() => {
      setTimer((prevWaktu) => {
        if (prevWaktu <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prevWaktu - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerActive, timer, answerReady]);

  return (
    <article className="study-page">
      <section className="study-page-progress">
        <h3>Progres kemanjuan sesi</h3>
        <div className="study-page-progress-bar">
          {[...Array(mockFlashcardSession.total)].map((curr, index) => (
            <div
              className="study-page-bar"
              key={index}
              style={{
                backgroundColor:
                  index < currentCardEnum
                    ? '#2196F3'
                    : index !== currentCardEnum
                      ? '#dfdfda'
                      : answerReady
                        ? '#2196F3'
                        : '#e3fc00',
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </section>
      <section className="study-page-container">
        <div className="study-page-question">
          <h2>{devComment}</h2>
        </div>
        <div className="study-page-timer">
          <h2>Sisa waktu</h2>
          <div>{timer} Detik</div>
        </div>
        <div
          className={answerReady ? 'flashcard flashcard-answered' : 'flashcard'}
        >
          <div
            className={
              answerReady
                ? 'flashcard-inner flashcard-rotate'
                : 'flashcard-inner'
            }
          >
            {answerReady ? (
              <div className="study-page-flashcard-back">
                <h2 className="kanji-meanings">
                  {
                    currentCard.choices.find(
                      (ch) => ch.wordId === currentCard.id
                    ).meaning
                  }
                </h2>
                <h2 className="flashcard-current-rating">rating: {rating}</h2>
              </div>
            ) : null}
            <div className="study-page-flashcard">
              <h2 className="kanji-question">
                {currentCard.kanji ? currentCard.kanji : currentCard.reading}
              </h2>
              <h2 className="kana-question">{currentCard.reading}</h2>
              <h2 className="romanji-question">{currentCard.romaji}</h2>
            </div>
          </div>
        </div>
        <ul className="study-page-answer-choice">
          {currentCard.choices.map((choice) => {
            let buttonStyle = {};
            if (answerReady) {
              if (choice.wordId === currentCard.id) {
                buttonStyle = {
                  backgroundColor: '#28a745',
                  color: '#fff',
                  borderColor: '#1e7e34',
                  animation: 'jump 0.5s ease-in-out',
                };
              } else if (
                choice.meaning === answer &&
                choice.wordId !== currentCard.id
              ) {
                buttonStyle = {
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  borderColor: '#bd2130',
                  animation: 'shake 0.7s ease-in-out',
                };
              } else {
                buttonStyle = {
                  opacity: 0.6,
                  backgroundColor: '#e9ecef',
                  color: '#6c757d',
                };
              }
            }
            return (
              <li key={choice.wordId}>
                <button
                  style={{ ...buttonStyle }}
                  disabled={answerReady}
                  className="study-page-choice-button"
                  onClick={() => handleAnswer(choice.wordId, choice.meaning)}
                >
                  {choice.meaning}
                </button>
              </li>
            );
          })}
          {answerReady ? (
            <button onClick={handleNextCard} className="next-sessions-button">
              {currentCardEnum === mockFlashcardSession.words.length - 1
                ? 'Lihat Rincian Sesi →'
                : 'Soal selanjutnya →'}
            </button>
          ) : null}
        </ul>
      </section>

      <FooterLicense />
    </article>
  );
}
