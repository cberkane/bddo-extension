import { useContext } from "react";

import type { Project } from "@/app/types/project";
import styles from "./ProjectItem.module.css";

import Edit from "@/assets/svg/edit.svg?react";
import Folder from "@/assets/svg/folder.svg?react";
import Trash from "@/assets/svg/trash.svg?react";
import { ViewChangeContext } from "@/app/contexts/ViewChangeContext";


type ProjectItemProps = {
    generic?: boolean;
    project?: Project;
    key: string;
}

const ProjectItem = ({ generic, project, key }: ProjectItemProps) => {
    const { setView } = useContext(ViewChangeContext);

    const handleClick = () => {
        if (!generic && project) {
            setView({ path: 'features', params: { project: project.name } });
        } else {
            setView({ path: 'features' });
        }
    }

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
    );
};

export default ProjectItem;