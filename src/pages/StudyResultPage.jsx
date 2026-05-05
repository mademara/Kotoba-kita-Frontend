import { FooterLicense } from '../components/FooterLicense';
import { mockFlashcardSession } from '../mock/mockData';
import { useLocation, Navigate } from 'react-router';

export default function StudyResultPage() {
  const location = useLocation();
  const summary = location.state ? location.state : [];
  if (summary.length !== 0) {
    return (
      <article className="result-page">
        <h2>Mantap Kamu berhasil menyelesaikan sesi kali ini!</h2>
        <section className="result-page-container">
          {summary.map((session) => {
            let bg = '';
            switch (session.rating) {
              case 'ingat':
                bg = '#9fe8c8';
                break;
              case 'cukup ingat':
                bg = '#cfe1b9';
                break;
              case 'kesulitan':
                bg = '#ffe599';
                break;
              case 'lupa':
                bg = '#ffccd5';
                break;
            }

            return (
              <div
                style={{ backgroundColor: bg }}
                key={session.id}
                className="result-card"
              >
                <h2>{session.kanji ? session.kanji : session.reading}</h2>
                <h3>{session.reading}</h3>
                <h3>{session.romaji}</h3>
                <h3>{session.meaning}</h3>
                <p>{session.rating}</p>
              </div>
            );
          })}
        </section>
        <FooterLicense />
      </article>
    );
  } else {
    return <Navigate to="/study" />;
  }
}
