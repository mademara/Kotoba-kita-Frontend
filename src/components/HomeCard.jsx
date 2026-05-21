import React from 'react';
import useStats from '../hooks/getStats';
import { useAuth } from '../contexts/AuthContext';

export default function HomeCard({
  upcoming,
  nextDueMinutes,
  dueTodayCount,
  retentionRate,
  stabilityDays,
  n5Progress,
  handleStartStudySessions,
}) {
  const { user } = useAuth();

  const isNewUser =
    !upcoming &&
    nextDueMinutes === 0 &&
    dueTodayCount === 0 &&
    retentionRate === 0 &&
    stabilityDays === 0 &&
    n5Progress === 0;
  const hasDueToday = dueTodayCount > 0;

  if (isNewUser) {
    return (
      <section className="home-page-startsessions user-new">
        <h3>
          Halo {user.username}, Sepertinya kamu baru mencoba Kotoba Kita ya?
        </h3>
        <p>
          Silahkan memulai petualangan belajar kosakata Jepang-mu dengan menekan
          tombol di bawah!
        </p>
        <button
          onClick={handleStartStudySessions}
          className="home-page-start-button"
        >
          Mulai Sesi Pertama →
        </button>
      </section>
    );
  }

  if (hasDueToday && nextDueMinutes === 0) {
    return (
      <section className="home-page-startsessions">
        <h3>
          Halo {user.username}, ada {dueTodayCount} kosakata yang sudah siap
          kamu tinjau sekarang!
        </h3>
        <p>
          Waktunya review! Sesi sudah siap dilaksanakan agar ingatan FSRS-mu
          tetap optimal.
        </p>
        <button
          onClick={handleStartStudySessions}
          className="home-page-start-button"
        >
          Review Sekarang →
        </button>
      </section>
    );
  }

  if (hasDueToday && nextDueMinutes > 0) {
    return (
      <section className="home-page-startsessions">
        <h3>
          Halo {user.username}, ada {dueTodayCount} kosakata menunggumu hari
          ini.
        </h3>
        <p>
          Tapi tunggu sebentar ya, sesi belajar berikutnya baru siap dalam{' '}
          <strong>{nextDueMinutes} menit</strong> lagi.
        </p>
        <button
          onClick={handleStartStudySessions}
          className="home-page-start-button"
        >
          Mulai Sesi (Tanpa Catat Statistik) →
        </button>
      </section>
    );
  }

  return (
    <section className="home-page-startsessions">
      <h3>
        Mantap! Semua hafalan sudah aman. Belum ada kosakata yang perlu
        di-review saat ini.
      </h3>
      <p>
        Kamu tetap bisa melakukan sesi belajar tambahan kok, tapi hasilnya tidak
        dicatat di statistik ya.
      </p>
      <button
        onClick={handleStartStudySessions}
        className="home-page-start-button"
      >
        Mulai Sesi Tambahan →
      </button>
    </section>
  );
}
