import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
    title: string;
    icon: React.ReactElement;
} & React.HTMLAttributes<HTMLElement>;

const Header = ({ title, icon, ...rest }: HeaderProps) => {
    const iconProps = { style: { width: "18px", height: "18px" } };
    const clonedIcon = React.cloneElement(icon, iconProps);

    return (
        <header {...rest}>
            <div className={styles.content}>
                <span className={styles.icon}>{clonedIcon}</span>
                <h1 className={styles.title}>{title}</h1>
            </div>
        </header>
    );
};

export default Header;
