import { useRef, useEffect } from "react";
import styles from "./Dialog.module.css"


type DialogProps = {
    open: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const Dialog = ({ open, children, onClose }: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open]);

    const handleCancel = () => {
        onClose();
    };

    return (
        <dialog ref={dialogRef} onCancel={handleCancel} className={styles.dialog}>
            <div>
                <button onClick={onClose} aria-label="Close" className={styles.dialogButton}>
                    ×
                </button>
            </div>
            {children}
        </dialog>
    );
};

export default Dialog;