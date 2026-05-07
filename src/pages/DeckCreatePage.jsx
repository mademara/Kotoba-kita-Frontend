import React from 'react';
import { FooterLicense } from '../components/FooterLicense';
import CreateDeck from '../components/CreateDeck';

export default function DeckCreatePage() {
  return (
    <article className="deck-create-page">
      <CreateDeck />
      <FooterLicense />
    </article>
  );
}
