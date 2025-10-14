import { useState } from "react";
import styles from "./ScenarioPage.module.css";

import Header from "@/app/components/core/Header/Header";
import ScenarioList from "@/app/components/scenarios/ScenarioList/ScenarioList";
import useScenarioLoad from "@/app/hooks/useScenarioLoad";
import type { Feature } from "@/app/types/feature";

import Dialog from "@/app/components/core/Dialog/Dialog";
import ScenarioForm from "@/app/components/scenarios/ScenarioForm/ScenarioForm";
import Desktop from "@/assets/svg/desktop.svg?react";

type ScenarioPageProps = {
    feature: Feature;
};

const ScenarioPage = ({ feature }: ScenarioPageProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { scenarios } = useScenarioLoad();
    const filteredScenarios = scenarios.filter(s => s.featureUuid === feature.uuid);

    const handleFormSuccess = () => {
        setIsFormOpen(false);
    }

    return (
        <>
            <>
                <Header className={styles.header} title="Scenarios" icon={<Desktop />} />
                <div className={styles.featureContainer}>
                    <h2><span>Feature:</span> {feature.title}</h2>
                </div>
                <ScenarioList scenarios={filteredScenarios} onAddScenario={() => setIsFormOpen(true)} />
            </>
            <Dialog open={isFormOpen} width="500px" onClose={() => setIsFormOpen(false)}>
                <ScenarioForm featureUuid={feature.uuid} onSuccess={handleFormSuccess} />
            </Dialog>
        </>
    );
};

export default ScenarioPage;
