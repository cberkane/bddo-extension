import { useRef, useEffect } from "react";
import styles from "./Dialog.module.css";

import Close from "@/assets/svg/close.svg?react";


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
                <button onClick={onClose} className={styles.dialogButton}>
                    <Close className={styles.dialogCloseIcon} />
                </button>
            </div>
            {children}
        </dialog>
    );
};

export default Dialog;