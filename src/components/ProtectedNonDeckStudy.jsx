import React from 'react';
import { Navigate } from 'react-router';
import useQuestions from '../hooks/getStudy';
import LoadingPage from '../pages/LoadingPage';
const ProtectedNonDeckStudy = ({ children }) => {
  const {
    errorMessage,
    loading,
    questions,
    freeDrill,
    totalQuestions,
    questionsDeckTitle,
  } = useQuestions();
  if (loading) {
    return <LoadingPage />;
  }
  if (errorMessage) {
    return <Navigate to="/404" replace />;
  }

  return React.cloneElement(children, {
    questions,
    freeDrill,
    totalQuestions,
    questionsDeckTitle,
  });
};

export default ProtectedNonDeckStudy;
