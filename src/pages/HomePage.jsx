import React from 'react';
import { useNavigate } from 'react-router';
import { FooterLicense } from '../components/FooterLicense';
import useStats from '../hooks/getStats';
import LoadingPage from './LoadingPage';
import { useAuth } from '../contexts/AuthContext';
import HomeCard from '../components/HomeCard';
export function HomePage() {
  const {
    errorMessage,
    loading,
    upcoming,
    nextDueMinutes,
    dueTodayCount,
    retentionRate,
    stabilityDays,
    n5Progress,
  } = useStats();
  const navigate = useNavigate();
  const handleStartStudySessions = () => {
    navigate('/study');
  };

  if (loading) {
    return <LoadingPage />;
  }
  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }
  return (
    <article className="home-page">
      <section className="home-page-statistics">
        <div className="home-page-retention-rate">
          <h2>Daya Ingat</h2>
          <p className="home-page-statistics-numbers">{retentionRate}%</p>
          <p className="home-page-statistics-explain">
            Dari semua kartu yang telah Kamu ulas, {retentionRate}% berhasil
            Kamu jawab dengan benar
          </p>
        </div>
        <div className="home-page-stability">
          <h2>Ketahanan Ingatan</h2>
          <p className="home-page-statistics-numbers">{stabilityDays} hari</p>
          <p className="home-page-statistics-explain">
            Rata-rata kata yang Kamu hafal saat ini bisa bertahan selama{' '}
            {stabilityDays} hari sebelum kamu berpeluang melupakannya
          </p>
        </div>
        <div className="home-page-progress">
          <h2>Progres Kosakata N5</h2>
          <p className="home-page-statistics-numbers">{n5Progress}%</p>
          <p className="home-page-statistics-explain">
            Saat ini, Kamu menguasai {n5Progress}% dari daftar Kata N5 yang kami
            sediakan
          </p>
        </div>
        <div className="home-page-streak">
          <h2>Streak</h2>
          <p className="home-page-statistics-numbers">- Hari 🔥</p>
          <p className="home-page-statistics-explain">
            Sistem Streak akan segera hadir 🚀
          </p>
        </div>
      </section>
      <HomeCard
        nextDueMinutes={nextDueMinutes}
        dueTodayCount={dueTodayCount}
        retentionRate={retentionRate}
        stabilityDays={stabilityDays}
        n5Progress={n5Progress}
        handleStartStudySessions={handleStartStudySessions}
      />
      <figure className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="quote-overlay">
              <p className="quote-text">
                &quot;Waktu terbaik untuk mengulas Kanji adalah saat Kamu hampir
                melupakannya.&quot;
              </p>
            </div>
          </div>

          <div className="flip-card-back">
            <div className="quote-overlay">
              <p className="quote-text">
                &quot;Sedikit demi sedikit, coretan rumit akan menetap di
                ingatan jangka panjang.&quot;
              </p>
            </div>
          </div>
        </div>
      </figure>
      <section className="home-page-upcoming-sessions">
        <h2>Daftar sesi selanjutnya:</h2>
        <ul className="home-page-upcoming-sessions-list">
          {upcoming.length !== 0 ? (
            upcoming.map(({ date, count }, i) => (
              <li key={i}>
                <p>{`${count} kata, pada ${date}`}</p>
              </li>
            ))
          ) : (
            <li>
              <p>Tidak ada Jadwal sesi berikutnya</p>
            </li>
          )}
        </ul>
      </section>
      <FooterLicense />
    </article>
  );
}
