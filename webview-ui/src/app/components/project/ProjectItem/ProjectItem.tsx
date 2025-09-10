import { useState, useContext } from "react";

import type { Project } from "@/app/types/project";
import styles from "./ProjectItem.module.css";

import Edit from "@/assets/svg/edit.svg?react";
import Folder from "@/assets/svg/folder.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import { ViewChangeContext } from "@/app/contexts/ViewChangeContext";
import Dialog from "../../shared/Dialog/Dialog";
import Button from "../../shared/Button/Button";
import { deleteProject } from "@/app/helpers/projectMessage";


type ProjectItemProps = {
    generic?: boolean;
    project?: Project;
    key: string;
}

const ProjectItem = ({ generic, project, key }: ProjectItemProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const { setView } = useContext(ViewChangeContext);

    const handleClick = () => {
        if (!generic && project) {
            setView({ path: 'features', params: { projectUuid: project.uuid } });
        } else {
            setView({ path: 'features' });
        }
    }
    
    const handleEdit = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowEditDialog(true);
    };

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
                <div className={styles.item} key={key}>
                    <Folder className={styles.folder} style={{ color: "#d7d348" }} />
                    <section className={styles.content} onClick={handleClick}>
                        <div>
                            <h3>{project ? project.name : "All"}</h3>
                        </div>
                    </section>
                    {!generic && <aside className={styles.actions}>
                        <Edit className={styles.icon} onClick={handleEdit} />
                        <Trash className={styles.icon} onClick={handleDelete} />
                    </aside>}
                </div>
            </>
            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <div className={styles.deleteDialog}>
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to permanently delete this feature?</p>
                    <div className={styles.actions}>
                        <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={() => onDeleteProject(project?.uuid)}>Delete</Button>
                    </div>
                </div>
            </Dialog>
            <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
                <p>Edit project functionality to be implemented.</p>
            </Dialog>
        </>
    );
};

export default ProjectItem;