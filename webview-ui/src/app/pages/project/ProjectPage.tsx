import { useState } from "react";
import styles from "./ProjectPage.module.css";

import Button from "@/app/components/core/Button/Button";
import Dialog from "@/app/components/core/Dialog/Dialog";
import Header from "@/app/components/core/Header/Header";
import ProjectForm from "@/app/components/projects/ProjectForm/ProjectForm";
import ProjectList from "@/app/components/projects/ProjectList/ProjectList";
import useProjectLoad from "@/app/hooks/useProjectLoad";

import Edit from "@/assets/svg/edit.svg?react";
import PageWrapper from "@/app/components/core/PageWrapper/PageWrapper";


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