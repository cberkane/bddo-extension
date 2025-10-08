import styles from "./Checkbox.module.css";

type CheckboxProps = {
    name: string;
    defaultChecked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ name, defaultChecked, onChange }: CheckboxProps) => (
    <div className={styles.container}>
        <label className={styles.label} htmlFor={name}>
            <input type="checkbox"
                className={styles.checkbox}
                id={name}
                name={name}
                defaultChecked={defaultChecked}
                onChange={onChange}
            />
        </label>
    </div>
);

export default Checkbox;