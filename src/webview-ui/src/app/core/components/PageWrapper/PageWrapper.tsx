import React from "react";
import styles from "./PageWrapper.module.css";

import Loader from "@/assets/svg/loader.svg?react";

type PageWrapperProps = {
    loading?: boolean;
    error?: boolean;
    children: React.ReactNode;

};

const PageWrapper = ({ loading, error, children }: PageWrapperProps) => {
    if (loading) return (
        <div className={styles.loadingState}>
            <Loader className={styles.loader} />
        </div>
    );

    if (error) return (
        <div className={styles.errorState}>
            <h2>Oops! Something went wrong.</h2>
        </div>
    );


    return <>{children}</>;
};

export default PageWrapper;