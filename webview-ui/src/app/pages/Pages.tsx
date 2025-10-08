import { useContext } from "react";
import { ViewChangeContext, ViewPath } from "../contexts/core/ViewChangeContext.js";
import FeatureView from "./feature/FeatureView";
import ProjectView from "./project/ProjectView";
import ScenarioView from "./scenario/ScenarioView";

const Views = () => {
    const { view } = useContext(ViewChangeContext);

    switch (view.path) {
        case ViewPath.Projects:
            return <ProjectView />;
        case ViewPath.Features:
            return <FeatureView projectUuid={view.params?.projectUuid} />;
        case ViewPath.Scenarios:
            return <ScenarioView projectUuid={view.params?.projectUuid} />;
        default:
            return <FeatureView />;

    }
};

export default Views;
