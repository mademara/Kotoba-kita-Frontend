import React from 'react';
import { useState, useEffect } from 'react';
import { getHomeStats } from '../services/api';

export default function useStats() {
  const [retentionRate, setRetentionRate] = useState(0);
  const [stabilityDays, setStabilityDays] = useState(0);
  const [n5Progress, setN5Progress] = useState(0);
  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [nextDueMinutes, setNextDueMinutes] = useState(0);
  const [upcoming, setUpcoming] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function grabStats() {
      setLoading(true);
      try {
        const response = await getHomeStats();
        setRetentionRate(response.retention_rate || 0);
        setStabilityDays(response.stability_days || 0);
        setN5Progress(response.n5_progress || 0);
        setDueTodayCount(response.upcoming_reviews.today.count || 0);
        setNextDueMinutes(
          response.upcoming_reviews.today.next_due_minutes || 0
        );
        setUpcoming(response.upcoming_reviews.upcoming || []);
      } catch (error) {
        if (error.request) {
          setErrorMessage(
            'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
          );
        } else {
          setErrorMessage(`Terjadi kesalahan sistem: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
    grabStats();
  }, []);
  return {
    errorMessage,
    loading,
    upcoming,
    nextDueMinutes,
    dueTodayCount,
    retentionRate,
    stabilityDays,
    n5Progress,
  };
}
