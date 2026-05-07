import { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { mockDecks } from '../mock/mockData';

const ConfirmEditModal = forwardRef(function ConfirmEditModal(
  { onConfirm },
  ref
) {
  const dialogRef = useRef(null);
  const [target, setTarget] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (target) => {
      setTarget(target);
      dialogRef.current?.showModal();
    },
    close: () => dialogRef.current?.close(),
  }));

  const handleConfirm = () => {
    onConfirm?.(target);
    dialogRef.current?.close();
  };

  return (
    <dialog className="dialog-modal" ref={dialogRef}>
      <div className="dialog-container">
        <h3>Konfirmasi Edit</h3>
        <p>Apakah kamu yakin ingin menyimpan perubahan pada deck?</p>
        {target ? <p>{target.title}</p> : null}

        <div className="dialog-button-container">
          <button
            className="cancel-dialog-button-edit"
            onClick={() => dialogRef.current?.close()}
          >
            Batal
          </button>
          <button
            className="confirm-dialog-button-edit"
            onClick={handleConfirm}
          >
            Simpan
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmEditModal;
