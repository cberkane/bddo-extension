import styles from './App.module.css';
import FeatureView from './app/views/feature/FeatureView';

const App = () => {
    return (
        <div className={styles.container}>
            <FeatureView />
        </div>
    );
};

export default App;
