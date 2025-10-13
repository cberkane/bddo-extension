import styles from "./InputTextArea.module.css";

type TextAreaProps = {
    name: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
    required?: boolean;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputTextArea = ({ name, label, placeholder, defaultValue, required, error, onChange, ...rest }: TextAreaProps) => {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={name} className={styles.label}>
                {required && <span className={styles.asterisk}>*</span>} {label}
            </label>
            <textarea 
                className={styles.textarea} 
                name={name}
                placeholder={placeholder} 
                defaultValue={defaultValue} 
                required={required} 
                onChange={onChange} 
                {...rest}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default InputTextArea;