import { useState } from "react";
import styles from "./ScenarioItem.module.css";

import Button from "@/app/components/core/Button/Button";
import Dialog from "@/app/components/core/Dialog/Dialog";
import { deleteScenario } from "@/app/helpers/scenarios/scenarioMessage";
import { ScenarioActionType, ScenarioType, type Scenario } from "@/app/types/scenario";

import Edit from "@/assets/svg/edit.svg?react";
import Error from "@/assets/svg/error.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import Verified from "@/assets/svg/verified.svg?react";
import Warning from "@/assets/svg/warning.svg?react";
import ScenarioForm from "../ScenarioForm/ScenarioForm";

type ScenarioItemProps = {
    key: string;
    position: number;
    scenario: Scenario;
};

const ScenarioItem = ({ key, position, scenario }: ScenarioItemProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const getStatusIcon = () => {
        switch (scenario.type) {
            case ScenarioType.HAPPY_PATH:
                return <Verified className={styles.iconVerified} />;
            case ScenarioType.EDGE_CASE:
                return <Warning className={styles.iconWarning} />;
            case ScenarioType.ERROR:
                return <Error className={styles.iconError} />;
            default:
                return null;
        }
    }
    const statusIcon = getStatusIcon();

    const handleEdit = (event: React.MouseEvent): void => {
        event.stopPropagation();
        setShowEditDialog(true);
    };

    const handleDelete = (event: React.MouseEvent): void => {
        event.stopPropagation();
        setShowDeleteDialog(true);
    };

    const onDelete = () => {
        deleteScenario(scenario.uuid);
    };

    return (
        <>
            <div className={styles.item} key={key}>
                <div className={styles.header}>
                    <h2>{position} - {scenario.title}</h2>
                    <Edit className={styles.headerIcon} onClick={handleEdit} />
                    <Trash className={styles.headerIcon} onClick={handleDelete} />
                </div>
                <div className={styles.content}>
                    <h3>Scenario</h3>
                    <p>{statusIcon} {scenario.type}</p>
                </div>
                <div className={styles.content}>
                    <h3>Given</h3>
                    <p>{scenario.given}</p>
                </div>
                <div className={styles.content}>
                    <h3>Expected</h3>
                    <p>{scenario.expected}</p>
                </div>
            </div>

            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <div className={styles.deleteDialog}>
                    <div className={styles.deleteDialogContent}>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to permanently delete this scenario?</p>
                    </div>
                    <div className={styles.deleteDialogActions}>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={() => onDelete()}>Delete</Button>
                    </div>
                </div>
            </Dialog>

            <Dialog open={showEditDialog} width="500px" onClose={() => setShowEditDialog(false)}>
                <ScenarioForm
                    featureUuid={scenario.featureUuid}
                    scenario={scenario}
                    action={ScenarioActionType.UPDATE_SCENARIO}
                    onSuccess={() => setShowEditDialog(false)}
                />
            </Dialog>
        </>
    );
};

export default ScenarioItem;
