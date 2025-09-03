import { useState } from "react";
import styles from "./FeatureItem.module.css";

import { FeatureState, type Feature } from "@/app/models/feature.model";
import Dialog from "@/app/components/shared/Dialog/Dialog";
import Button from "@/app/components/shared/Button/Button";
import FeatureForm from "../FeatureForm/FeatureForm";
import Edit from "./../../../../assets/svg/edit.svg?react";
import Trash from "./../../../../assets/svg/trash.svg?react";


type FeatureItemProps = {
    feature: Feature;
    onDelete: (uuid: string) => void;
    onEdit?: (feature: Feature) => void;
}

const FeatureItem = ({ feature, onDelete }: FeatureItemProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <>
            {/* LATER: implement title editing */}
            <div className={styles.featureItem}>
                <div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                </div>
                <div className={styles.featureActions}>
                    <Edit className={styles.icon} onClick={() => setShowEditDialog(true)} />
                    <Trash className={styles.icon} onClick={() => setShowDeleteDialog(true)} />
                </div>
            </div>
            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                {/* Confirm Deletion (to be implemented) */}
                <div className={styles.deleteDialog}>
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to permanently delete this feature?</p>
                    <div className={styles.deleteDialogActions}>
                        <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={() => onDelete(feature.uuid)}>Delete</Button>
                    </div>
                </div>
            </Dialog>
            <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
                <FeatureForm
                    feature={feature}
                    onSuccess={() => setShowEditDialog(false)}
                    action={FeatureState.UPDATE_FEATURE}
                />
            </Dialog>
        </>
    )
}

export default FeatureItem;