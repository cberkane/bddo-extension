import styles from './Switcher.module.css';

type SwitcherProps = {
    title: string;
    indicator?: "up" | "down";
    onClick?: () => void;
}


const Switcher = ({ title, indicator, onClick }: SwitcherProps) => {
    return (
        <div className={styles.switcher} onClick={onClick}>
            <span>{title}</span>
            {indicator && <span className={styles.indicator}>{indicator === "up" ? "▲" : "▼"}</span>}
        </div>
    );
}

export default Switcher;