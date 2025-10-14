import { useContext } from "react";

import type { Feature } from "@/app/types/feature";
import { ViewChangeContext, ViewPath } from "@/app/contexts/core/ViewChangeContext";

import FeaturePage from "@/app/pages/feature/FeaturePage";
import ProjectPage from "@/app/pages/project/ProjectPage";
import ScenarioPage from "@/app/pages/scenario/ScenarioPage";

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
