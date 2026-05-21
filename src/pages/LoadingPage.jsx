import React from 'react';

function LoadingPage({ pesan = 'Memuat...' }) {
  return (
    <article className="loading-container">
      <section className="loading-box">
        <div className="loading-spinner"></div>
        <p className="loading-text">{pesan}</p>
      </section>
    </article>
  );
}

export default LoadingPage;
