import styles from './InputText.module.css';

type TextInputProps = {
    name: string;
    label?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({ name, label, value, defaultValue, placeholder, required, onChange }: TextInputProps) => (
    <div className={styles.inputGroup}>
        {label && <label htmlFor={name} className={styles.label}>{label}</label>}
        <input
            type="text"
            autoComplete="off"
            className={styles.input}
            id={name}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
        />
    </div>
);

export default TextInput;