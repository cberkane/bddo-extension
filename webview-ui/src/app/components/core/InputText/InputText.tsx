import styles from './InputText.module.css';

type TextInputProps = {
    name: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
    required?: boolean;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = ({ name, label, placeholder, defaultValue, required, error, onChange, ...rest }: TextInputProps) => (
    <div className={styles.inputGroup}>
        <label htmlFor={name} className={styles.label}>
            {required && <span className={styles.asterisk}>*</span>} {label}
        </label>
        <input
            type="text"
            autoComplete="off"
            className={styles.input}
            id={name}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            {...rest}
        />
        {error && <span className={styles.error}>{error}</span>}
    </div>
);

export default InputText;