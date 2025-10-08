import { useContext } from "react";

import { ViewChangeContext, ViewPath } from "@/app/contexts/core/ViewChangeContext.js";
import FeaturePage from "@/app/pages/feature/FeaturePage";
import ProjectPage from "@/app/pages/project/ProjectPage";
import ScenarioPage from "@/app/pages/scenario/ScenarioPage";

const Views = () => {
    const { view } = useContext(ViewChangeContext);

    switch (view.path) {
        case ViewPath.Projects:
            return <ProjectPage />;
        case ViewPath.Features:
            return <FeaturePage projectUuid={view.params?.projectUuid} />;
        case ViewPath.Scenarios:
            return <ScenarioPage featureUuid={view.params?.featureUuid} />;
        default:
            return <FeaturePage />;
    }
};

export default Views;
