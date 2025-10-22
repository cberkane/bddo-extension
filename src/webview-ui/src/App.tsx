import { useState } from "react";
import styles from "./App.module.css";

import Pages from "@/Views";
import NavSwitcher from "@/app/core/components/NavSwitcher/NavSwitcher";
import { type View, ViewChangeContext } from "@/app/core/contexts/ViewChangeContext";

import Back from "@/assets/svg/back.svg?react";

const App = () => {
    const [view, setView] = useState<View>({ path: "features", params: {} });

    const switchView = () => {
        if (view.path === "features") {
            setView({ path: "projects", params: {} });
        } else {
            setView({ path: "features", params: {} });
        }
    }

    const goBack = () => {
        if (view.path === "scenarios") {
            setView({ path: "features", params: {} });
        }
    }

    const switcherVisible = view.path === "features" || view.path === "projects";
    const navBackVisible = view.path === "scenarios";

    return (
        <ViewChangeContext.Provider value={{ view, setView }}>
            <div className={styles.container}>
                <div>
                    {switcherVisible &&
                        <NavSwitcher
                            title={view.path === "projects" ? "Tasks" : "Folders"}
                            indicator={view.path === "projects" ? "up" : "down"}
                            onClick={switchView}
                        />
                    }
                    {navBackVisible &&
                        <div className={styles.backNavSpacer} onClick={goBack}>
                            <Back className={styles.backIcon} />
                            <span>Back to tasks</span>
                        </div>
                    }
                </div>
                <hr className={styles.divider} />
                <Pages />
            </div>
        </ViewChangeContext.Provider>
    );
};

export default App;
