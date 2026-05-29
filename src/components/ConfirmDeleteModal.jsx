import { useRef, useImperativeHandle, forwardRef, useState } from 'react';

const ConfirmDeleteModal = forwardRef(function ConfirmDeleteModal(
  { onConfirm },
  ref
) {
  const dialogRef = useRef(null);
  const [targetId, setTargetId] = useState(null);
  const [targetTitle, setTargetTitle] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (id, title) => {
      setTargetId(id);
      setTargetTitle(title);
      dialogRef.current?.showModal();
    },
    close: () => dialogRef.current?.close(),
  }));

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm?.(targetId);
    }
    dialogRef.current?.close();
    window.location.reload();
  };

  return (
    <dialog className="dialog-modal" ref={dialogRef}>
      <div className="dialog-container">
        <h3>Konfirmasi Hapus</h3>
        <p>Apakah kamu yakin ingin menghapus deck?</p>
        {targetId ? <p>{targetTitle}</p> : null}

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
