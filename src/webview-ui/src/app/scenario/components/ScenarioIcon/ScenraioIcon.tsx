import React from "react";
import styles from "./scenario-icon.module.css";

import { ScenarioType } from "@extension/types/scenario.type";

import Error from "@/assets/svg/error.svg?react";
import Verified from "@/assets/svg/verified.svg?react";
import Warning from "@/assets/svg/warning.svg?react";

type ScenarioIconProps = {
    type: ScenarioType;
    opacity?: number;
    size?: string;
};

const ScenarioIcon = ({ type, opacity = 1, size = "14px" }: ScenarioIconProps) => {
    const getStatusIcon = () => {
        switch (type) {
            case ScenarioType.HAPPY_PATH:
                return <Verified className={styles.verified} />;
            case ScenarioType.EDGE_CASE:
                return <Warning className={styles.warning} />;
            case ScenarioType.ERROR:
                return <Error className={styles.error} />;
            default:
                return null;
        }
    }

    const icon = getStatusIcon() as React.ReactElement;
    const iconProps = { style: { width: size, height: size, opacity } };
    const element = React.cloneElement(icon , iconProps);
    
    return element;
};

export default ScenarioIcon;

