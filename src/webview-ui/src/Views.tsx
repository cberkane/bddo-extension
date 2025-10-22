import { useContext } from "react";

import { ViewChangeContext, ViewPath } from "@/app/core/contexts/ViewChangeContext";
import FeaturePage from "@/app/feature/pages/FeaturePage";
import ProjectPage from "@/app/project/pages/ProjectPage";
import ScenarioPage from "@/app/scenario/pages/ScenarioPage";
import type { Feature } from "@extension/types/features.type";

const Views = () => {
    const { view } = useContext(ViewChangeContext);

    switch (view.path) {
        case ViewPath.Projects:
            return <ProjectPage />;
        case ViewPath.Features:
            return <FeaturePage projectUuid={view.params?.projectUuid as string} />;
        case ViewPath.Scenarios:
            return <ScenarioPage feature={view.params?.feature as Feature} />;
        default:
            return <FeaturePage />;
    }
};

export default Views;