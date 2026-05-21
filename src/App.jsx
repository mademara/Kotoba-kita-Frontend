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
import StudyDeckChoicePage from './pages/StudyDeckChoicePage';
import StudyResultPage from './pages/StudyResultPage';
import DeckEditPage from './pages/DeckEditPage';
import DeckCreatePage from './pages/DeckCreatePage';
import ProtectedNonDeck from './components/ProtectedNonDeck';
import { AuthProvider } from './contexts/AuthContext';

export function App() {
  return (
    <AuthProvider>
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

            <Route path="decks">
              <Route index element={<DeckListPage />} />
              <Route path="create" element={<DeckCreatePage />} />
              <Route
                path=":deckId"
                element={
                  <ProtectedNonDeck>
                    <DeckDetailPage />
                  </ProtectedNonDeck>
                }
              />
              <Route path=":deckId/edit" element={<DeckEditPage />} />
            </Route>

            <Route path="study">
              <Route index element={<StudyDeckChoicePage />} />
              <Route path="result" element={<StudyResultPage />} />
              <Route
                path=":deckId"
                element={
                  <ProtectedNonDeck>
                    <StudyPage />
                  </ProtectedNonDeck>
                }
              />
            </Route>

            <Route path="dictionary" element={<DictionaryPage />} />
          </Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
