import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
    title: string;
    icon: React.ReactElement;
};

const Header = ({ title, icon }: HeaderProps) => {
    const iconProps = { style: { width: "24px", height: "24px" } };
    const clonedIcon = React.cloneElement(
        icon,
        iconProps,
    );

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <span className={styles.icon}>{clonedIcon}</span>
                <h1 className={styles.title}>{title}</h1>
            </div>
        </header>
    );
};

export default Header;
