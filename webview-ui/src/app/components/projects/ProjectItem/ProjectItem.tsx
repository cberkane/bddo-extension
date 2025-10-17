import { useContext, useState } from "react";
import styles from "./ProjectItem.module.css";

import Button from "@/app/components/core/Button/Button";
import Dialog from "@/app/components/core/Dialog/Dialog";
import { ViewChangeContext } from "@/app/contexts/core/ViewChangeContext";
import { deleteProject } from "@/app/helpers/projects/projectMessage";
import type { Project } from "@/app/types/project";

import Folder from "@/assets/svg/folder.svg?react";
import Trash from "@/assets/svg/trash.svg?react";


type ProjectItemProps = {
    generic?: boolean;
    project?: Project;
    key: string;
}

const ProjectItem = ({ generic, project, key }: ProjectItemProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { setView } = useContext(ViewChangeContext);

    const handleClick = () => {
        if (!generic && project) {
            setView({ path: 'features', params: { projectUuid: project.uuid } });
        } else {
            setView({ path: 'features', params: {} });
        }
    }

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowDeleteDialog(true);
    };

    const onDeleteProject = (projectUuid?: string) => {
        if (generic || !projectUuid) return;

        deleteProject(projectUuid);
        setShowDeleteDialog(false);
    };

    return (
        <>
            <>
                <div className={styles.item} key={key} onClick={handleClick}>
                    <Folder className={styles.folder} style={{ color: "#d7d348" }} />
                    <section className={styles.content}>
                        <div>
                            <h3 className={styles.title}>{project ? project.name : "All"}</h3>
                        </div>
                    </section>
                    {!generic && <aside className={styles.actions}>
                        <Trash className={styles.icon} onClick={handleDelete} />
                    </aside>}
                </div>
            </>
            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <div className={styles.deleteDialog}>
                    <div className={styles.content}>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to permanently delete this folder?</p>
                    </div>
                    <div className={styles.actions}>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={() => onDeleteProject(project?.uuid)}>Delete</Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ProjectItem;