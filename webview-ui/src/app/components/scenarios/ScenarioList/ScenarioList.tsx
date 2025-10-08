import styles from "./ScenarioList.module.css";

import { type Scenario } from "@/app/types/scenario";

type ScenarioListProps = {
    scenarios: Scenario[];
};

const ScenarioList = ({ scenarios }: ScenarioListProps) => {
    return (
        <div className={styles.featureList}>
            {scenarios.length > 0 &&
                <ul className={styles.featureListItems}>
                    {scenarios.map(scenario => (
                        <li key={scenario.uuid}>
                            {scenario.title}
                        </li>
                    ))}
                </ul>
            }
            {scenarios.length === 0 &&
                <div className={styles.emptyState}>
                    <div>
                        <h2>No scenarios found.</h2>
                        <p>Consider adding some, if it is a new feature.</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default ScenarioList;
