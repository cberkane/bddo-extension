import type { Project } from "@/app/types/project";
import styles from "./ProjectList.module.css";
import ProjectItem from "../ProjectItem/ProjectItem";

type ProjectListProps = {
    projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
    return (
        <div>
            <ul className={styles.list}>
                <li key={"all"}>
                    <ProjectItem key={"all"} generic={true} />
                </li>
                {projects?.map(project => (
                    <li key={project.uuid}>
                        <ProjectItem
                            key={project.uuid}
                            project={project}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
