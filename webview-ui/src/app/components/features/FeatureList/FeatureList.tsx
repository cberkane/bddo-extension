
import styles from "./FeatureList.module.css";

import { type Feature } from "@/app/types/feature";
import FeatureItem from "../FeatureItem/FeatureItem";

type FeatureListProps = {
    features: Feature[];
}

const FeatureList = ({ features }: FeatureListProps) => {
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
                    <div>
                        <h2>No features found.</h2>
                        <p>Consider adding some, if it is a new project.</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default FeatureList;
