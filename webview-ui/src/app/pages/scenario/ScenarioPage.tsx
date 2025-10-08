import { useState } from "react";
import styles from "./ScenarioPage.module.css";

import Button from "@/app/components/core/Button/Button";
import Header from "@/app/components/core/Header/Header";
import ScenarioList from "@/app/components/scenarios/ScenarioList/ScenarioList";
import useScenarioLoad from "@/app/hooks/useScenarioLoad";

import Desktop from "@/assets/svg/desktop.svg?react";
import Dialog from "@/app/components/core/Dialog/Dialog";
import ScenarioForm from "@/app/components/scenarios/ScenarioForm/ScenarioForm";

type ScenarioPageProps = {
    featureUuid: string;
};

const ScenarioPage = ({ featureUuid }: ScenarioPageProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { scenarios } = useScenarioLoad();
    const filteredScenarios = scenarios.filter(s => s.featureUuid === featureUuid);

    const handleFormSuccess = () => {
        setIsFormOpen(false);
    }

    return (
        <>
            <>
                <Header className={styles.header} title="Scenarios" icon={<Desktop />} />
                <ScenarioList scenarios={filteredScenarios} />
                <div className={styles.actions}>
                    <Button onClick={() => setIsFormOpen(true)}>
                        Add Scenario
                    </Button>
                </div>
            </>
            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <ScenarioForm featureUuid={featureUuid} onSuccess={handleFormSuccess} />
            </Dialog>
        </>
    );
};

export default ScenarioPage;
