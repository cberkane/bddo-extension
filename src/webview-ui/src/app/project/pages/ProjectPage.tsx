import { useState } from "react";
import styles from "./ProjectPage.module.css";

import Button from "@/app/core/components/Button/Button";
import Dialog from "@/app/core/components/Dialog/Dialog";
import Header from "@/app/core/components/Header/Header";
import PageWrapper from "@/app/core/components/PageWrapper/PageWrapper";
import ProjectForm from "@/app/project/components/ProjectForm/ProjectForm";
import ProjectList from "@/app/project/components/ProjectList/ProjectList";
import useProjectLoad from "@/app/project/hooks/useProjectLoad";

import Edit from "@/assets/svg/edit.svg?react";


const ProjectPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { projects, loading } = useProjectLoad();

    return (
        <PageWrapper loading={loading}>
            <>
                <>
                    <Header title="Folders" icon={<Edit />} className={styles.header} />
                    <ProjectList projects={projects} />
                    <div className={styles.actions}>
                        <Button onClick={() => setIsFormOpen(true)}>
                            New Folder
                        </Button>
                    </div>
                </>

                <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
                    <ProjectForm onSuccess={() => setIsFormOpen(false)} />
                </Dialog>
            </>
        </PageWrapper>
    );
};

export default ProjectPage;