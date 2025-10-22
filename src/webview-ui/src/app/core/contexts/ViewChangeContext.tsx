import { createContext } from "react";

export enum ViewPath {
    Features = "features",
    Projects = "projects",
    Scenarios = "scenarios",
}

export type View = {
    path: string;
    params: Record<string, unknown>;
}

export type ViewChange = {
    view: View;
    setView: (view: View) => void;
}

export const ViewChangeContext = createContext<ViewChange>({
    view: { path: ViewPath.Features, params: {} },
    setView: () => { },
});