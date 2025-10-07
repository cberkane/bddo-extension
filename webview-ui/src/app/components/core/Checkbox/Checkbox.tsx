import styles from './Checkbox.module.css';

type CheckboxProps = {
    name: string;
    label?: string;
    defaultChecked?: boolean;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ name, label, defaultChecked, onChange }: CheckboxProps) => (
    <div className={styles.inputGroup}>
        <label htmlFor={name} className={styles.label}>
            <input
                type="checkbox"
                className={styles.checkbox}
                id={name}
                name={name}
                defaultChecked={defaultChecked}
                onChange={onChange}
            />
            {label && <span>{label}</span>}
        </label>
    </div>
);

export default Checkbox;