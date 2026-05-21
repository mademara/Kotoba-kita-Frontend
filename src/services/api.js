import axiosInstance from './axiosInstance';

// Auth
export const login = (email, password) =>
  axiosInstance
    .post('/api/auth/login/', { email, password })
    .then((res) => res.data);

export const register = (username, email, password) =>
  axiosInstance
    .post('/api/auth/register/', { username, email, password })
    .then((res) => res.data);

export const logout = (refresh) =>
  axiosInstance.post('/api/auth/logout/', { refresh }).then((res) => res.data);

export const refresh = (refresh) =>
  axiosInstance
    .post('/api/auth/token/refresh/', { refresh })
    .then((res) => res.data);

// Words
export const getWords = (url = '/api/words/') =>
  axiosInstance.get(url).then((res) => res.data);

// Decks
export const getDecks = () =>
  axiosInstance.get('/api/decks/').then((res) => res.data);

export const createDeck = (payload) =>
  axiosInstance.post('/api/decks/', payload).then((res) => res.data);

export const updateDeck = (id, payload) =>
  axiosInstance.patch(`/api/decks/${id}/`, payload).then((res) => res.data);

export const deleteDeck = (id) => axiosInstance.delete(`/api/decks/${id}/`);

// Flashcards
export const startStudy = (deckId) =>
  axiosInstance.get(`/api/study/${deckId}/start/`).then((res) => res.data);

export const submitAnswer = (payload) =>
  axiosInstance.post('/api/study/submit/', payload).then((res) => res.data);

// Home stats
export const getHomeStats = () =>
  axiosInstance.get('/api/home/stats/').then((res) => res.data);
