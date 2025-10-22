import styles from './Select.module.css';

type Option = {
    value: string;
    label: string;
};

type SelectProps = {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    defaultValue?: string;
    required?: boolean;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({
    name,
    label,
    options,
    placeholder,
    defaultValue,
    required,
    error,
    onChange,
    ...rest
}: SelectProps) => (
    <div className={styles.container}>
        <label htmlFor={name} className={styles.label}>
            {required && <span className={styles.asterisk}>*</span>} {label}
        </label>
        <select
            className={styles.select}
            id={name}
            name={name}
            defaultValue={defaultValue}
            required={required}
            onChange={onChange}
            {...rest}
        >
            <option value="" disabled>
                {placeholder || "Sélectionner..."}
            </option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
        {error && <span className={styles.error}>{error}</span>}
    </div>
);

export default Select;