import { useContext, useState } from "react";
import styles from "./FeatureItem.module.css";

import Button from "@/app/components/core/Button/Button";
import Checkbox from "@/app/components/core/Checkbox/Checkbox";
import Dialog from "@/app/components/core/Dialog/Dialog";
import { ViewChangeContext } from "@/app/contexts/core/ViewChangeContext";
import { FeatureActionType, type Feature } from "@/app/types/feature";
import FeatureForm from "../FeatureForm/FeatureForm.js";

import Edit from "@/assets/svg/edit.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import { updateFeature } from "@/app/helpers/features/featureMessage.js";
import useProjectLoad from "@/app/hooks/useProjectLoad";


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
    
    const { projects } = useProjectLoad();
    const project = projects.find(p => p.uuid === feature?.projectUuid) ?? null;

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

    const checkFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const updatedFeature = { ...feature, completed: event.target.checked };
        updateFeature(feature.uuid, updatedFeature);
    };

    return (
        <>
            <>
                <div className={styles.item} key={feature.uuid}>
                    <div className={styles.content}>
                        <Checkbox
                            name={feature.uuid}
                            defaultChecked={feature.completed}
                            onChange={checkFeature}
                        />
                        <div onClick={gotoScenario} className={feature.completed ? styles.completed : ""}>
                            <h3 className={styles.title}>{feature.title}</h3>
                            {project && <p>{project.name}</p>}
                            <small>Last updated: {feature.updatedAt ?? feature.createdAt}</small>
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
                        <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={() => onDelete(feature.uuid)}>Delete</Button>
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