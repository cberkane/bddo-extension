import styles from "./ScenarioPage.module.css";

import Header from "@/app/components/core/Header/Header";
import ScenarioList from "@/app/components/scenarios/ScenarioList/ScenarioList";
import useScenarioLoad from "@/app/hooks/useScenarioLoad";
import Desktop from "@/assets/svg/desktop.svg?react";

type ScenarioPageProps = {
    featureUuid?: string;
};

const ScenarioPage = ({ featureUuid }: ScenarioPageProps) => {
    const { scenarios } = useScenarioLoad();
    const filteredScenarios = scenarios.filter(s => s.featureUuid === featureUuid);

    return (
        <>
            <Header className={styles.header} title="Scenarios" icon={<Desktop />} />
            <ScenarioList scenarios={filteredScenarios} />
        </>
    );
};

export default ScenarioPage;
