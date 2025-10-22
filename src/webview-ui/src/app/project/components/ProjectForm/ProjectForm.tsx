import { useRef, useState } from "react";
import styles from "./ProjectForm.module.css";

import Button from "@/app/core/components/Button/Button";
import InputText from "@/app/core/components/InputText/InputText";
import { getProjectFormErrors } from "@/app/project/helpers/projectForm";
import { addProject, updateProject } from "@/app/project/helpers/projectMessage";

import { ProjectActionType, type Project } from "@extension/types/project.type";

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
	const [errors, setErrors] = useState<Map<string, string>>(new Map());

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const valid = validate(event.currentTarget);
		if (!valid) return;
		submit(event);
	};

	const validate = (form: HTMLFormElement): boolean => {
		const formErrors = getProjectFormErrors(form);
		setErrors(formErrors);
		return formErrors.size === 0;
	};

	const submit = (event: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(event.currentTarget);
		const data: Partial<Project> = {
			name: formData.get("name") as string,
		};

		if (action === ProjectActionType.ADD_PROJECT) {
			data.createdAt = new Date();
			addProject(data);
			resetForm();
		} else if (action === ProjectActionType.UPDATE_PROJECT && project) {
			updateProject(project.uuid, data);
		}
		onSuccess();
	};

	const resetForm = () => {
		ref.current?.reset();
		setErrors(new Map());
	};

	return (
		<form ref={ref} className={styles.form} onSubmit={handleSubmit} noValidate>
			<InputText
				name="name"
				label="Project Name"
				placeholder="Enter project name"
				defaultValue={project?.name}
				required={true}
				error={errors.get("name")}
			/>
			<Button type="submit">
				{action === ProjectActionType.UPDATE_PROJECT ? "Update Folder" : "Add Folder"}
			</Button>
		</form>
	);
};

export default ProjectForm;
