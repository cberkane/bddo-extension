import { useContext, useState } from "react";
import styles from "./FeatureItem.module.css";

import Button from "@/app/components/shared/Button/Button";
import Checkbox from "@/app/components/shared/Checkbox/Checkbox";
import Dialog from "@/app/components/shared/Dialog/Dialog";
import { ViewChangeContext } from "@/app/contexts/ViewChangeContext";
import { FeatureState, type Feature } from "@/app/models/feature.model";
import FeatureForm from "../FeatureForm/FeatureForm";

import Edit from "@/assets/svg/edit.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import { updateFeature } from "@/app/helpers/featureMessage";


type FeatureItemProps = {
    feature: Feature;
    key: string;
    onDelete: (uuid: string) => void;
    onEdit?: (feature: Feature) => void;
}

const FeatureItem = ({ feature, onDelete }: FeatureItemProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const { setView } = useContext(ViewChangeContext);

    const handleEdit = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowEditDialog(true);
    };

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowDeleteDialog(true);
    };

    const gotoScenario = (event: React.MouseEvent) => {
        event.stopPropagation();
        setView({ path: "scenarios", params: { uuid: feature.uuid } });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const updatedFeature = { ...feature, completed: event.target.checked };
        updateFeature(feature.uuid, updatedFeature);
    };

    return (
        <>
            <>
                <div className={styles.featureItem} key={feature.uuid}>
                    <div className={styles.featureInfo}>
                        <Checkbox
                            name={feature.uuid}
                            defaultChecked={feature.completed}
                            onChange={handleChange}
                        />
                        <div onClick={gotoScenario} className={feature.completed ? styles.completed : ""}>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            {feature.project && <p>{feature.project}</p>}
                            <small>Last updated: {feature.updatedAt ?? feature.createdAt}</small>
                        </div>
                    </div>
                    <div className={styles.featureActions}>
                        <Edit className={styles.icon} onClick={handleEdit} />
                        <Trash className={styles.icon} onClick={handleDelete} />
                    </div>
                </div>
            </>
            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
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
                    action={FeatureState.UPDATE_FEATURE}
                    onSuccess={() => setShowEditDialog(false)}
                />
            </Dialog>
        </>
    )
}

export default FeatureItem;