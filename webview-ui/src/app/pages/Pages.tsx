import { useContext } from "react";
import { ViewChangeContext, ViewPath } from "../contexts/core/ViewChangeContext.js";
import FeatureView from "./feature/FeatureView.js";
import ProjectView from "./project/ProjectView.js";

const Views = () => {
    const { view } = useContext(ViewChangeContext);

    switch (view.path) {
        case ViewPath.Projects:
            return <ProjectView />;
        case ViewPath.Features:
            return <FeatureView projectUuid={view.params?.projectUuid} />;
        default:
            return <FeatureView />;

    }
};

export default Views;
