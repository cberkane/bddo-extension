import { useState } from 'react';
import styles from './App.module.css';

import { type View, ViewChangeContext } from '@/app/contexts/ViewChangeContext';
import Views from '@/app/views/Views';

const App = () => {
    const [view, setView] = useState<View>({ path: "features", params: {} });
    return (
        <ViewChangeContext.Provider value={{ view, setView }}>
            <div className={styles.container}>
                <Views />
            </div>
        </ViewChangeContext.Provider>
    );
};

export default App;
