import { useState } from 'react';
import styles from './App.module.css';

import { type View, ViewChangeContext } from '@/app/contexts/core/ViewChangeContext';
import Views from '@/app/pages/Pages';
import Switcher from './app/components/core/Switcher/Switcher';

const App = () => {
    const [view, setView] = useState<View>({ path: "features", params: {} });

    const handleClick = () => {
        if (view.path === "features") {
            setView({ path: "projects" });
        } else {
            setView({ path: "features" });
        }
    }

    const switcherVisible = view.path === "features" || view.path === "projects";

    return (
        <ViewChangeContext.Provider value={{ view, setView }}>
            <div className={styles.container}>
                {switcherVisible && (
                    <Switcher
                        title={view.path === "features" ? "Projects" : "Features"}
                        indicator={view.path === "features" ? "down" : "up"}
                        onClick={handleClick}
                    />
                )}
                <Views />
            </div>
        </ViewChangeContext.Provider>
    );
};

export default App;
