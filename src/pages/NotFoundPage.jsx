import React from 'react';
import { Link } from 'react-router';
import pict404 from '../assets/404pict.webp';

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <aside className="not-found-page-pict">
        <figure>
          <img src={pict404} alt="Gambar lentera ditengah hutan 404" />
        </figure>
      </aside>
      <article className="not-found-page-teks">
        <h1>Kotoba Kita 404</h1>
        <h2>Halaman tidak ditemukan</h2>
        <p>
          Beberapa kata memang sengaja disembunyikan semesta. Di antara ribuan
          kata itu, ada satu jejak yang tak terbaca. Nampaknya itu adalah jejak
          langkahmu.
          <Link to={'/home'} className="not-found-page-back-to-home">
            Mari pulang ke beranda.
          </Link>
        </p>
      </article>
    </main>
  );
}
