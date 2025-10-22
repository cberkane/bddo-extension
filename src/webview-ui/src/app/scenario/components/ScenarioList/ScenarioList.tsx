import styles from "./ScenarioList.module.css";

import Button from "@/app/core/components/Button/Button";
import ScenarioItem from "@/app/scenario/components/ScenarioItem/ScenarioItem";
import { type Scenario } from "@extension/types/scenario.type";

import Plus from "@/assets/svg/plus.svg?react";

type ScenarioListProps = {
    scenarios: Scenario[];
    onAddScenario?: () => void;
};

const ScenarioList = ({ scenarios, onAddScenario }: ScenarioListProps) => {
    return (
        <div className={styles.scenarioList}>
            {scenarios.length > 0 &&
                <div className={styles.scenarioListContent}>
                    <ul className={styles.scenarioListItems}>
                        {scenarios.map((scenario, index) => (
                            <li className={styles.scenarioListItem} key={scenario.uuid}>
                                <ScenarioItem key={scenario.uuid} position={index + 1} scenario={scenario} />
                            </li>
                        ))}
                    </ul>
                    <Button className={styles.fab} variant="rounded" onClick={onAddScenario}>
                        <Plus className={styles.icon} />
                    </Button>
                </div>
            }

            {scenarios.length === 0 &&
                <div className={styles.emptyState}>
                    <h2 className={styles.machin}>No scenarios added.</h2>
                    <p>Consider adding scenarios to this task.</p>
                    <Button onClick={onAddScenario}>
                        Add Scenario
                    </Button>
                </div>
            }
        </div>
    );
};

export default ScenarioList;
