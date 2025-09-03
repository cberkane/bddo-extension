import type React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "outline" | "rounded";
    onClick?: () => void;
}

export default function Button({ children, className, type, variant = "primary", onClick }: ButtonProps) {
    return (
        <button 
            className={`${styles.button} ${styles[variant]} ${className}`} 
            onClick={onClick} 
            type={type}
        >
            {children}
        </button>
    );
}