
import styles from "./FeatureList.module.css";

import { type Feature } from "@/app/types/feature";
import FeatureItem from "../FeatureItem/FeatureItem.js";
import { updateFeature, deleteFeature } from "@/app/helpers/features/featureMessage.js";

type FeatureListProps = {
    features: Feature[];
}

const FeatureList = ({ features }: FeatureListProps) => {
    // TODO: put in item component
    const onFeatureEdit = (feature: Feature) => {
        updateFeature(feature.uuid, feature);
    }

    const onFeatureDelete = (uuid: string) => {
        deleteFeature(uuid);
    }

    return (
        <div className={styles.featureList}>
            <ul className={styles.featureListItems}>
                {features.map(feature => (
                    <li key={feature.uuid}>
                        <FeatureItem
                            key={feature.uuid}
                            feature={feature}
                            onEdit={(event) => onFeatureEdit(event)}
                            onDelete={() => onFeatureDelete(feature.uuid)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeatureList;
