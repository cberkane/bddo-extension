import { useContext, useState } from "react";
import styles from "./FeatureItem.module.css";

import Button from "@/app/components/core/Button/Button";
import Checkbox from "@/app/components/core/Checkbox/Checkbox";
import Dialog from "@/app/components/core/Dialog/Dialog";
import { ViewChangeContext } from "@/app/contexts/core/ViewChangeContext";
import { getFormattedDate } from "@/app/helpers/core/date.js";
import { deleteFeature, updateFeature } from "@/app/helpers/features/featureMessage";
import useProjectLoad from "@/app/hooks/useProjectLoad";
import { FeatureActionType, type Feature } from "@/app/types/feature";
import Edit from "@/assets/svg/edit.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import FeatureForm from "../FeatureForm/FeatureForm.js";

type FeatureItemProps = {
    feature: Feature;
    key: string;
}

const FeatureItem = ({ feature }: FeatureItemProps) => {
    const { setView } = useContext(ViewChangeContext);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const { projects } = useProjectLoad();
    const project = projects.find(p => p.uuid === feature?.projectUuid) ?? null;

    const handleEdit = (event: React.MouseEvent): void => {
        event.stopPropagation();
        setShowEditDialog(true);
    };

    const handleDelete = (event: React.MouseEvent): void => {
        event.stopPropagation();
        setShowDeleteDialog(true);
    };

    const onDelete = () => {
        deleteFeature(feature.uuid);
    };

    const checkFeature = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.stopPropagation();
        const updatedFeature = { ...feature, completed: event.target.checked };
        updateFeature(feature.uuid, updatedFeature);
    };

    const gotoScenarios = (event: React.MouseEvent): void => {
        event.stopPropagation();
        setView({ path: "scenarios", params: { featureUuid: feature.uuid } });
    };

    const formatDate = (date: string | undefined): string => {
        return getFormattedDate(date);
    };

    return (
        <>
            <>
                <div className={styles.item} key={feature.uuid}>
                    <div className={styles.content}>
                        <div className={styles.checkbox}>
                            <Checkbox
                                name={feature.uuid}
                                defaultChecked={feature.completed}
                                onChange={checkFeature}
                            />
                        </div>
                        <div className={`${feature.completed && styles.completed}`} onClick={gotoScenarios}>
                            <h3 className={styles.title}>{feature.title}</h3>
                            <p className={styles.info}>{project ? project.name : "All"}</p>
                            <p className={styles.info}> Last update at {feature.updatedAt ? formatDate(feature.updatedAt) : formatDate(feature.createdAt)}</p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Edit className={styles.icon} onClick={handleEdit} />
                        <Trash className={styles.icon} onClick={handleDelete} />
                    </div>
                </div>
            </>

            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <div className={styles.deleteDialog}>
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to permanently delete this feature?</p>
                    <div className={styles.actions}>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={() => onDelete()}>Delete</Button>
                    </div>
                </div>
            </Dialog>

            <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
                <FeatureForm
                    feature={feature}
                    action={FeatureActionType.UPDATE_FEATURE}
                    onSuccess={() => setShowEditDialog(false)}
                />
            </Dialog>
        </>
    )
}

export default FeatureItem;