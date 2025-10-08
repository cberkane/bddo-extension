import styles from "./ScenarioItem.module.css";

import type { Scenario } from "@/app/types/scenario";

type ScenarioItemProps = {
    key: string;
    scenario: Scenario
}

const ScenarioItem = ({ key, scenario }: ScenarioItemProps) => {
    return (
        <div className={styles.scenarioItem} key={key}>
            {scenario.title}
        </div>
    );
}

export default ScenarioItem;