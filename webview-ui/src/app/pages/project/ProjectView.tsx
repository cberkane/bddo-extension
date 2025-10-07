import { useState } from "react";
import styles from "./ProjectView.module.css";

import Button from "@/app/components/core/Button/Button";
import Header from "@/app/components/core/Header/Header";
import useProjectLoad from "@/app/hooks/useProjectLoad";

import Edit from "@/assets/svg/edit.svg?react";
import ProjectList from "@/app/components/projects/ProjectList/ProjectList";
import Dialog from "@/app/components/core/Dialog/Dialog";
import ProjectForm from "@/app/components/projects/ProjectForm/ProjectForm";


const ProjectView = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { projects } = useProjectLoad();

    return (
        <>
            <>
                <Header title="Projects" icon={<Edit />} className={styles.header} />
                <ProjectList projects={projects} />
                <div className={styles.actions}>
                    <Button onClick={() => setIsFormOpen(true)}>
                        New Project
                    </Button>
                </div>
            </>
            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <ProjectForm onSuccess={() => setIsFormOpen(false)} />
            </Dialog>
        </>
    );
};

export default ProjectView;