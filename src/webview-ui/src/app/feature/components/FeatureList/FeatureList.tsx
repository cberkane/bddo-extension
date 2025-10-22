
import styles from "./FeatureList.module.css";

import Button from "@/app/core/components/Button/Button";
import FeatureItem from "@/app/feature/components/FeatureItem/FeatureItem";
import { type Feature } from "@extension/types/features.type";

type FeatureListProps = {
    features: Feature[];
    onAddTask?: () => void;
}

const FeatureList = ({ features, onAddTask }: FeatureListProps) => {
    return (
        <div className={styles.featureList}>
            {features.length > 0 &&
                <ul className={styles.featureListItems}>
                    {features.map(feature => (
                        <li key={feature.uuid}>
                            <FeatureItem key={feature.uuid} feature={feature} />
                        </li>
                    ))}
                </ul>
            }
            {features.length === 0 &&
                <div className={styles.emptyState}>
                    <h2>No tasks found.</h2>
                    <p>Click on the button below to add a new task.</p>
                    <Button onClick={onAddTask}>
                        Add Task
                    </Button>
                </div>
            }
        </div>
    );
};

export default FeatureList;
