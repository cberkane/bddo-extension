import { useState } from "react";
import styles from "./FeatureView.module.css";

import FeatureForm from "@/app/components/feature/FeatureForm/FeatureForm";
import FeatureList from "@/app/components/feature/FeatureList/FeatureList";
import Button from "@/app/components/shared/Button/Button";
import Dialog from "@/app/components/shared/Dialog/Dialog";
import useFeatureLoad from "@/app/hooks/useFeatureLoad";
import Header from "@/app/components/shared/Header/Header";

import Edit from "@/assets/svg/edit.svg?react";
import Plus from "@/assets/svg/plus.svg?react";

const FeatureView = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { features } = useFeatureLoad();

    return (
        <>
            <>
                <Header title="Features" icon={<Edit />} />
                <FeatureList features={features} />
                <Button onClick={() => setIsFormOpen(true)}
                    className={styles.openButton}
                    variant="rounded"
                >
                    <Plus style={{ width: '24px', height: '24px' }} />
                </Button>
            </>
            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <FeatureForm onSuccess={() => setIsFormOpen(false)} />
            </Dialog>
        </>
    );
};

export default FeatureView;
