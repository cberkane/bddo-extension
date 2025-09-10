
import styles from "./FeatureList.module.css";

import { type Feature } from "@/app/types/feature";
import FeatureItem from "../FeatureItem/FeatureItem";
import { updateFeature } from "@/app/helpers/featureMessage";

type FeatureListProps = {
    features: Feature[];
}

const FeatureList = ({ features }: FeatureListProps) => {
    // TODO: put in item component
    const editFeature = (feature: Feature) => {
        updateFeature(feature.uuid, feature);
    }

    const deleteFeature = (uuid: string) => {
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
