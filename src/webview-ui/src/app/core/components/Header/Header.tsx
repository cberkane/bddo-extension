import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
    title: string;
    icon: React.ReactElement;
} & React.HTMLAttributes<HTMLElement>;

// TODO: rename to PageHeader
const Header = ({ title, icon, ...rest }: HeaderProps) => {
    const iconProps = { style: { width: "16px", height: "16px" } };
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
