import { useContext } from "react";
import { ViewChangeContext, ViewPath } from "../contexts/ViewChangeContext";
import FeatureView from "./feature/FeatureView";
import ScenarioView from "./scenarios/ScenarioView";
import ProjectView from "./project/ProjectView";

const Views = () => {
    const { view } = useContext(ViewChangeContext);
    switch (view.path) {
        case ViewPath.Projects:
            return <ProjectView />;
        case ViewPath.Features:
            return <FeatureView params={view.params} />;
        case ViewPath.Scenarios:
            return <ScenarioView />;
        default:
            return <FeatureView />;

    }
};
export default Views;
