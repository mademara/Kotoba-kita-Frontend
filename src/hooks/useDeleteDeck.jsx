import React, { useState } from 'react';
import { deleteDeck } from '../services/api';

export default function useDeleteDeck() {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const response = await deleteDeck(id);
    } catch (error) {
      if (error.request) {
        setDeleteError(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
        );
      } else {
        setDeleteError(`Terjadi kesalahan sistem: ${error.message}`);
      }
    } finally {
      setDeleteLoading(false);
    }
  };
  return { deleteLoading, deleteError, handleDelete };
}
