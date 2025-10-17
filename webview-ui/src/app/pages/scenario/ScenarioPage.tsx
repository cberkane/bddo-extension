import { useState } from "react";
import styles from "./ScenarioPage.module.css";

import Dialog from "@/app/components/core/Dialog/Dialog";
import Header from "@/app/components/core/Header/Header";
import ScenarioForm from "@/app/components/scenarios/ScenarioForm/ScenarioForm";
import ScenarioList from "@/app/components/scenarios/ScenarioList/ScenarioList";
import useScenarioLoad from "@/app/hooks/useScenarioLoad";
import type { Feature } from "@/app/types/feature";
import { ScenarioType } from "@/app/types/scenario";
import ScenarioIcon from "@/app/components/scenarios/ScenarioIcon/ScenraioIcon";

import Desktop from "@/assets/svg/desktop.svg?react";
import PageWrapper from "@/app/components/core/PageWrapper/PageWrapper";

type ScenarioPageProps = {
    feature: Feature;
};

const ScenarioPage = ({ feature }: ScenarioPageProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { scenarios, loading } = useScenarioLoad();
    const filteredScenarios = scenarios.filter(s => s.featureUuid === feature.uuid);

    const handleFormSuccess = () => {
        setIsFormOpen(false);
    }

    const completedCount = filteredScenarios.filter(s => s.completed).length;
    const happyPathCount = filteredScenarios.filter(s => s.type === ScenarioType.HAPPY_PATH).length;
    const edgeCaseCount = filteredScenarios.filter(s => s.type === ScenarioType.EDGE_CASE).length;
    const errorCount = filteredScenarios.filter(s => s.type === ScenarioType.ERROR).length;
    const count = filteredScenarios.length;

    return (
        <PageWrapper loading={loading}>
            <>
                <>
                    <Header className={styles.header} title="Scenarios" icon={<Desktop />} />
                    {filteredScenarios.length > 0 &&
                        <div className={styles.subHeader}>
                            <h2>
                                <span>Task:</span> {feature.title}
                            </h2>
                            <p className={styles.info}>completed scenarios: {completedCount} / {count}</p>
                            <div className={styles.infoGroup}>
                                <span>
                                    <ScenarioIcon type={ScenarioType.HAPPY_PATH} size="16px" /> happy path: {happyPathCount}
                                </span>
                                <span>
                                    <ScenarioIcon type={ScenarioType.EDGE_CASE} size="16px" /> edge case: {edgeCaseCount}
                                </span>
                                <span>
                                    <ScenarioIcon type={ScenarioType.ERROR} size="16px" /> error: {errorCount}
                                </span>
                            </div>
                        </div>
                    }
                    <ScenarioList scenarios={filteredScenarios} onAddScenario={() => setIsFormOpen(true)} />
                </>
                <Dialog open={isFormOpen} width="500px" onClose={() => setIsFormOpen(false)}>
                    <ScenarioForm featureUuid={feature.uuid} onSuccess={handleFormSuccess} />
                </Dialog>
            </>
        </PageWrapper>
    );
};

export default ScenarioPage;
