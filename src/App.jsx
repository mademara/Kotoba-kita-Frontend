import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { DashboardLayout } from './layout/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { DeckDetailPage } from './pages/DeckDetailPage';
import { DeckListPage } from './pages/DeckListPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StudyPage } from './pages/StudyPage';
import { DictionaryPage } from './pages/DictionaryPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="decks" element={<DeckListPage />} />
          <Route path="decks/:deckId" element={<DeckDetailPage />} />
          <Route path="study" element={<StudyPage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
