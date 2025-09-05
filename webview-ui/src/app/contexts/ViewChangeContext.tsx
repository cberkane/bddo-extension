import { createContext } from "react";

export enum ViewPath {
    Features = "features",
    Scenarios = "scenarios",
}

export type View = {
    path: string;
    params: Record<string, string>;
}

export type ViewChange = {
    view: View;
    setView: (view: View) => void;
}

export const ViewChangeContext = createContext<ViewChange>({
    view: { path: ViewPath.Features, params: {} },
    setView: () => { }, // TODO: change function name !
});