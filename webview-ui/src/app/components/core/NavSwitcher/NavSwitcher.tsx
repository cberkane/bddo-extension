import styles from "./NavSwitcher.module.css";

import Up from "@/assets/svg/up.svg?react";
import Down from "@/assets/svg/down.svg?react";

type SwitcherProps = {
    title: string;
    indicator: "up" | "down";
    onClick?: () => void;
}

const NavSwitcher = ({ title, indicator, onClick }: SwitcherProps) => {
    return (
        <div className={styles.switcher} onClick={onClick}>
            <span className={styles.title}>{title}</span>
            {indicator &&
                <span className={styles.indicator}>
                    {indicator === "up" ?
                        <Up className={`${styles.icon}`} /> :
                        <Down className={`${styles.icon}`} />
                    }
                </span>
            }
        </div>
    );
}

export default NavSwitcher;