import React from 'react';
import { useNavigate } from 'react-router';
import { FooterLicense } from '../components/FooterLicense';
export function HomePage() {
  const navigate = useNavigate();
  const handleStartStudySessions = () => {
    navigate('/study');
  };
  const handleStartDrillSessions = () => {
    navigate('/study');
  };
  return (
    <article className="home-page">
      <section className="home-page-statistics">
        <div className="home-page-retention-rate">
          <h2>Daya Ingat</h2>
          <p className="home-page-statistics-numbers">80%</p>
          <p className="home-page-statistics-explain">
            Dari semua kartu yang telah Kamu ulas, 91% berhasil Kamu jawab
            dengan benar
          </p>
        </div>
        <div className="home-page-stability">
          <h2>Ketahanan Ingatan</h2>
          <p className="home-page-statistics-numbers">12 hari</p>
          <p className="home-page-statistics-explain">
            Rata-rata kata yang Kamu hafal saat ini bisa bertahan selama 12 hari
            sebelum kamu berpeluang melupakannya
          </p>
        </div>
        <div className="home-page-progress">
          <h2>Progres Kosakata N5</h2>
          <p className="home-page-statistics-numbers">40%</p>
          <p className="home-page-statistics-explain">
            Saat ini, Kamu menguasai 40% dari daftar Kata N5 yang kami sediakan
          </p>
        </div>
        <div className="home-page-streak">
          <h2>Streak</h2>
          <p className="home-page-statistics-numbers">5 Hari 🔥</p>
          <p className="home-page-statistics-explain">Yolooo 🚀</p>
        </div>
      </section>
      <section className="home-page-startsessions">
        <h3>
          Mantap! Semua hafalan sudah aman. Sesi berikutnya dalam 3 jam lagi ya!
        </h3>
        <p>
          Kamu tetap bisa melakukan sesi belajar kok, tapi hasilnya tidak
          dicatat di statistik ya
        </p>
        <button
          onClick={handleStartStudySessions}
          className="home-page-start-button"
        >
          Mulai sesi →
        </button>
      </section>
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
          <li>
            <p>2 kata Dalam 5 menit lagi</p>
          </li>
          <li>
            <p>12 kata Dalam 15 menit lagi</p>
          </li>
          <li>
            <p>22 kata Dalam 1 jam lagi</p>
          </li>
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>{' '}
          <li>
            <p>20 kata Dalam 1 hari lagi</p>
          </li>
        </ul>
      </section>
      <FooterLicense />
    </article>
  );
}
