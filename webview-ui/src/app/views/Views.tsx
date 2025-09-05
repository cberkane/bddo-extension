import { useContext } from "react";
import { ViewChangeContext, ViewPath } from "../contexts/ViewChangeContext";
import FeatureView from "./feature/FeatureView";
import ScenarioView from "./scenarios/ScenarioView";

const Views = () => {
    const { view } = useContext(ViewChangeContext);
    switch (view.path) {
        case ViewPath.Features:
            return <FeatureView />;
        case ViewPath.Scenarios:
            return <ScenarioView params={view.params} />;
        default:
            return <FeatureView />;
    }
};
export default Views;
