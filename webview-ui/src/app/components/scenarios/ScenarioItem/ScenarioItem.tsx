import { useState } from "react";
import styles from "./ScenarioItem.module.css";

import Button from "@/app/components/core/Button/Button";
import Dialog from "@/app/components/core/Dialog/Dialog";
import ScenarioForm from "@/app/components/scenarios/ScenarioForm/ScenarioForm";
import { deleteScenario, updateScenario } from "@/app/helpers/scenarios/scenarioMessage";
import { ScenarioActionType, ScenarioType, type Scenario } from "@/app/types/scenario";

import Edit from "@/assets/svg/edit.svg?react";
import Error from "@/assets/svg/error.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import Verified from "@/assets/svg/verified.svg?react";
import Warning from "@/assets/svg/warning.svg?react";
import Checkbox from "../../core/Checkbox/Checkbox";

type ScenarioItemProps = {
    key: string;
    position: number;
    scenario: Scenario;
};

const ScenarioItem = ({ key, scenario }: ScenarioItemProps) => {
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

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const updatedScenario = { ...scenario, completed: e.target.checked };
        updateScenario(scenario.uuid, updatedScenario);
    }

    return (
        <>
            <div className={styles.item} key={key}>
                <aside className={styles.aside}>
                    <Checkbox
                        defaultChecked={scenario.completed}
                        name={scenario.title}
                        onChange={handleCheck}
                    />
                </aside>
                <div className={styles.body}>
                    <div className={styles.content}>
                        <p><span className={styles.label}>Scenario: </span>{scenario.title} {statusIcon}</p>
                    </div>
                    <div className={styles.content}>
                        <p><span className={styles.label}>Given: </span>{scenario.given}</p>
                    </div>
                    <div className={styles.content}>
                        <p><span className={styles.label}>Expected: </span>{scenario.expected}</p>
                    </div>
                    <div className={styles.actions}>
                        <span>
                            <Edit className={styles.actionIcon} onClick={handleEdit} />
                            Edit
                        </span>
                        <span>
                            <Trash className={styles.actionIcon} onClick={handleDelete} />
                            Delete
                        </span>
                    </div>
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
