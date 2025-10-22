import type React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "outline" | "rounded";
    className?: string;
    disabled?: boolean;
}

export default function Button({ children, onClick, type, variant = "primary", className, disabled = false }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}