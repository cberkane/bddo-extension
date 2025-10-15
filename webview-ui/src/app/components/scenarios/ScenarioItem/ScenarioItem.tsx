import { useState } from "react";
import styles from "./ScenarioItem.module.css";

import Button from "@/app/components/core/Button/Button";
import Checkbox from "@/app/components/core/Checkbox/Checkbox";
import Dialog from "@/app/components/core/Dialog/Dialog";
import ScenarioForm from "@/app/components/scenarios/ScenarioForm/ScenarioForm";
import { deleteScenario, updateScenario } from "@/app/helpers/scenarios/scenarioMessage";
import { ScenarioActionType, type Scenario } from "@/app/types/scenario";

import Edit from "@/assets/svg/edit.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import ScenarioIcon from "../ScenarioIcon/ScenraioIcon";

type ScenarioItemProps = {
    key: string;
    position: number;
    scenario: Scenario;
};

const ScenarioItem = ({ key, scenario }: ScenarioItemProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

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
                    <div>
                        <p className={styles.label}>Scenario :</p> 
                        <p className={styles.illustrated}>{scenario.title} <ScenarioIcon type={scenario.type} opacity={0.5} /></p>
                    </div>
                    <div>
                        <p className={styles.label}>Given :</p> 
                        <p>{scenario.given}</p>
                    </div>
                    <div>
                        <p className={styles.label}>Expected :</p> 
                        <p>{scenario.expected}</p>
                    </div>
                    <div className={styles.actions}>
                        <span className={styles.action} onClick={handleEdit}>
                            <Edit className={styles.actionIcon} />
                            <span>Edit</span>
                        </span>
                        <span className={styles.action} onClick={handleDelete}>
                            <Trash className={styles.actionIcon} />
                            <span>Delete</span>
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
