import { useState } from "react";
import styles from "./App.module.css";

import NavSwitcher from "@/app/components/core/NavSwitcher/NavSwitcher";
import { type View, ViewChangeContext } from "@/app/contexts/core/ViewChangeContext";
import Views from "@/app/pages/Pages";

import Back from "@/assets/svg/back.svg?react";

const App = () => {
    const [view, setView] = useState<View>({ path: "features", params: {} });

    const switchView = () => {
        if (view.path === "features") {
            setView({ path: "projects" });
        } else {
            setView({ path: "features" });
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
                            title={view.path === "features" ? "Projects" : "Features"}
                            indicator={view.path === "features" ? "down" : "up"}
                            onClick={switchView}
                        />
                    }
                    {navBackVisible &&
                        <div className={styles.backNavSpacer} onClick={goBack}>
                            <Back className={styles.backIcon} />
                            <span>Back to Features</span>
                        </div>
                    }
                </div>
                <hr className={styles.divider} />
                <Views />
            </div>
        </ViewChangeContext.Provider>
    );
};

export default App;
