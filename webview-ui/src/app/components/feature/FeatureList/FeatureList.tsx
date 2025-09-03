
import styles from "./FeatureList.module.css";

import { FeatureState, type Feature } from "@/app/models/feature.model";
import FeatureItem from "../FeatureItem/FeatureItem";

type FeatureListProps = {
    features: Feature[];
}

const FeatureList = ({ features }: FeatureListProps) => {
    const editFeature = (feature: Feature) => {
        window.vscode.postMessage({
            command: FeatureState.UPDATE_FEATURE,
            data: { uuid: feature.uuid, updatedFeature: feature }
        })
    }

    const deleteFeature = (uuid: string) => {
        window.vscode.postMessage({
            command: FeatureState.DELETE_FEATURE,
            data: { uuid }
        });
    }

    return (
        <div className={styles.featureList}>
            <ul className={styles.featureListItems}>
                {features.map(feature => (
                    <li key={feature.uuid}>
                        <FeatureItem
                            feature={feature}
                            onEdit={(event) => editFeature(event)}
                            onDelete={() => deleteFeature(feature.uuid)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeatureList;
