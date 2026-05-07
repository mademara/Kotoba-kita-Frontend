import { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { mockDecks } from '../mock/mockData';

const ConfirmDeleteModal = forwardRef(function ConfirmDeleteModal(
  { onConfirm },
  ref
) {
  const dialogRef = useRef(null);
  const [targetId, setTargetId] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setTargetId(id);
      dialogRef.current?.showModal();
    },
    close: () => dialogRef.current?.close(),
  }));

  const handleConfirm = () => {
    onConfirm?.(targetId);
    dialogRef.current?.close();
  };

  return (
    <dialog className="dialog-modal" ref={dialogRef}>
      <div className="dialog-container">
        <h3>Konfirmasi Hapus</h3>
        <p>Apakah kamu yakin ingin menghapus deck?</p>
        {targetId ? (
          <p>{mockDecks.find((d) => d.id === targetId).title}</p>
        ) : null}

        <div className="dialog-button-container">
          <button
            className="cancel-dialog-button"
            onClick={() => dialogRef.current?.close()}
          >
            Batal
          </button>
          <button className="confirm-dialog-button" onClick={handleConfirm}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmDeleteModal;
