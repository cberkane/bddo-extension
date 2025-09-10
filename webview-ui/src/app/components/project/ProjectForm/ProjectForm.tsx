import { useRef, useState } from "react";
import styles from "./ProjectForm.module.css";

import Button from "@/app/components/shared/Button/Button";
import InputText from "@/app/components/shared/InputText/InputText";
import { getFormErrors } from "@/app/helpers/projectForm";
import { addProject, updateProject } from "@/app/helpers/projectMessage";
import { ProjectActionType, type Project } from "@/app/types/project";

type ProjectFormProps = {
	onSuccess: () => void;
	project?: Project;
	action?: ProjectActionType;
};

const ProjectForm = ({
	onSuccess,
	project,
	action = ProjectActionType.ADD_PROJECT,
}: ProjectFormProps) => {
	const ref = useRef<HTMLFormElement>(null);
	const [isValid, setIsValid] = useState(false);
	const [errors, setErrors] = useState<Map<string, string>>(new Map());

	const handleInput = () => {
		if (!ref.current) return;

		const formErrors = getFormErrors(ref.current);
		setErrors(formErrors);
		setIsValid(formErrors.size === 0);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data: Partial<Project> = {
			name: formData.get("name") as string,
		};

		if (action === ProjectActionType.ADD_PROJECT) {
			data.createdAt = new Date();
			addProject(data);

			event.currentTarget.reset();
			setIsValid(false);
			setErrors(new Map());
		}

		if (action === ProjectActionType.UPDATE_PROJECT && project) {
			updateProject(project.uuid, data);
		}

		onSuccess();
	};

	return (
		<form
			ref={ref}
			className={styles.projectForm}
			onSubmit={handleSubmit}
			onInput={handleInput}
		>
			<InputText
				name="name"
				label="Project Name"
				placeholder="Enter project name"
				defaultValue={project?.name}
				required={true}
				minLength={3}
				error={errors.get("name")}
			/>
			<Button type="submit" disabled={!isValid}>
				{action === ProjectActionType.UPDATE_PROJECT ? "Update Project" : "Add Project"}
			</Button>
		</form>
	);
};

export default ProjectForm;
