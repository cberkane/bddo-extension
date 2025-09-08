import type { Project } from "@/app/types/project";
import styles from "./ProjectItem.module.css";

import Edit from "@/assets/svg/edit.svg?react";
import Folder from "@/assets/svg/folder.svg?react";
import Trash from "@/assets/svg/trash.svg?react";


type ProjectItemProps = {
    project: Project;
    key: string;
}

const ProjectItem = ({ project, key }: ProjectItemProps) => {

    const handleEdit = (event: React.MouseEvent) => {
        event.stopPropagation();
        // Implement edit functionality here
    };

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        // Implement delete functionality here
    };

    return (
        <>
            <div className={styles.item} key={key}>
                <Folder className={styles.folder} style={{ color: "#d7d348" }} />
                <section className={styles.content}>
                    <div>
                        <h3>{project.name}</h3>
                    </div>
                </section>
                <aside className={styles.actions}>
                    <Edit className={styles.icon} onClick={handleEdit} />
                    <Trash className={styles.icon} onClick={handleDelete} />
                </aside>
            </div>

        </>
    );
};

export default ProjectItem;