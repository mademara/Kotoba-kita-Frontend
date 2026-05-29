import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { FooterLicense } from '../components/FooterLicense';
import { useAnswerSubmit } from '../hooks/useAnswerSubmit';

export function StudyPage({
  questions,
  freeDrill,
  totalQuestions,
  questionsDeckTitle,
}) {
  const [currentCardEnum, setCurrentCardEnum] = useState(0);
  const [answerReady, setAnswerReady] = useState(false);
  const [timer, setTimer] = useState(20);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [summary, setSummary] = useState([]);

  const navigate = useNavigate();
  const currentCard = questions[currentCardEnum];

  const stopTimer = useCallback(() => setIsTimerActive(false), []);

  const onSuccess = useCallback(() => setAnswerReady(true), []);

  const {
    loading,
    answer,
    rating,
    comment,
    pendingAnswer,
    handleAnswer,
    reset,
  } = useAnswerSubmit({ currentCard, timer, freeDrill, stopTimer, onSuccess });

  useEffect(() => {
    if (!isTimerActive || timer <= 0 || answerReady) return;

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isTimerActive, timer, answerReady]);

  useEffect(() => {
    if (timer <= 0 && !answerReady) {
      handleAnswer(0, 'Unanswered');
    }
  }, [timer, answerReady, handleAnswer]);

  const handleNextCard = () => {
    const currentCardSummary = {
      id: currentCard.id,
      kanji: currentCard.kanji ?? currentCard.reading,
      reading: currentCard.reading,
      romaji: currentCard.romaji,
      meaning: currentCard.choices.find((c) => c.word_id === currentCard.id)
        .meaning,
      rating,
    };

    const updatedSummary = [...summary, currentCardSummary];

    if (currentCardEnum === totalQuestions - 1) {
      navigate('/study/result', { state: updatedSummary });
      return;
    }

    setSummary(updatedSummary);
    setCurrentCardEnum((prev) => prev + 1);
    setAnswerReady(false);
    setTimer(20);
    setIsTimerActive(true);
    reset();
  };

  return (
    <article className="study-page">
      <section className="study-page-progress">
        <h3>Progres kemajuan sesi</h3>
        <div className="study-page-progress-bar">
          {[...Array(totalQuestions)].map((_, index) => (
            <div
              key={index}
              className="study-page-bar"
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
          <p>Deck: {questionsDeckTitle}</p>
          <p>Mode: {freeDrill ? 'Free Drill' : 'Sesi Belajar'}</p>
          <h2>{comment}</h2>
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
            {answerReady && (
              <div className="study-page-flashcard-back">
                <h2 className="kanji-meanings">
                  {
                    currentCard.choices.find(
                      (ch) => ch.word_id === currentCard.id
                    ).meaning
                  }
                </h2>
                <h2 className="flashcard-current-rating">rating: {rating}</h2>
              </div>
            )}
            <div className="study-page-flashcard">
              <h2 className="kanji-question">
                {currentCard.kanji ?? currentCard.reading}
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
              if (choice.word_id === currentCard.id) {
                buttonStyle = {
                  backgroundColor: '#28a745',
                  color: '#fff',
                  borderColor: '#1e7e34',
                  animation: 'jump 0.5s ease-in-out',
                };
              } else if (
                choice.meaning === answer &&
                choice.word_id !== currentCard.id
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
              <li key={choice.word_id}>
                <button
                  style={buttonStyle}
                  disabled={loading || !!pendingAnswer}
                  className="study-page-choice-button"
                  onClick={() => handleAnswer(choice.word_id, choice.meaning)}
                >
                  {choice.meaning}
                </button>
              </li>
            );
          })}

          {answerReady ? (
            <button onClick={handleNextCard} className="next-sessions-button">
              {currentCardEnum === totalQuestions - 1
                ? 'Lihat Rincian Sesi →'
                : 'Soal selanjutnya →'}
            </button>
          ) : pendingAnswer && !answerReady ? (
            <button
              onClick={() =>
                handleAnswer(pendingAnswer.ansId, pendingAnswer.ans)
              }
              className="next-sessions-button"
            >
              Coba lagi ↺
            </button>
          ) : null}
        </ul>
      </section>
      <FooterLicense />
    </article>
  );
}
