import { useRef, useState } from "react";
import styles from "./FeatureForm.module.css";

import Button from "@/app/components/core/Button/Button";
import InputText from "@/app/components/core/InputText/InputText";
import Select from "@/app/components/core/Select/Select";
import { getFeatureFormErrors } from "@/app/helpers/features/featureForm";
import { addFeature, updateFeature } from "@/app/helpers/features/featureMessage";
import useProjectLoad from "@/app/hooks/useProjectLoad";
import { FeatureActionType, type Feature } from "@/app/types/feature";

type FeaturePageFormProps = {
    onSuccess: () => void;
    feature?: Feature;
    action?: FeatureActionType;
};

const FeatureForm = ({
    onSuccess,
    feature,
    action = FeatureActionType.ADD_FEATURE,
}: FeaturePageFormProps) => {
    const ref = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<Map<string, string>>(new Map());

    const { projects } = useProjectLoad();
    const projectOptions = [{ value: "all", label: "All" }].concat(
        projects.map(project => ({
            value: project.uuid,
            label: project.name,
        }))
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const valid = validate(event.currentTarget);
        if (!valid) return;
        sendData(event);
    };

    const validate = (form: HTMLFormElement): boolean => {
        const formErrors = getFeatureFormErrors(form);
        setErrors(formErrors);

        return formErrors.size === 0;
    };

    const sendData = (event: React.FormEvent<HTMLFormElement>): void => {
        const formData = new FormData(event.currentTarget);
        const data: Partial<Feature> = {
            title: formData.get("title") as string,
            projectUuid: formData.get("projectUuid") as string | undefined,
        };

        if (feature && action === FeatureActionType.UPDATE_FEATURE) {
            data.updatedAt = new Date().toISOString();
            updateFeature(feature.uuid, data);
        } else {
            data.completed = false;
            data.createdAt = new Date().toISOString();
            addFeature(data);
            resetForm();
        }
        onSuccess();
    };

    const resetForm = () => {
        ref.current?.reset();
        setErrors(new Map());
    };

    return (
        <form className={styles.form} ref={ref} onSubmit={handleSubmit} noValidate>
            <InputText
                name="title"
                label="Title"
                placeholder="Task title"
                defaultValue={feature?.title}
                required={true}
                error={errors.get("title")}
            />
            <Select
                name="projectUuid"
                label="Folder"
                placeholder="Select a folder"
                options={projectOptions}
                error={errors.get("projectUuid")}
            />
            <div className={styles.actions}>
                <Button type="submit">
                    {action === FeatureActionType.UPDATE_FEATURE ? "Update Task" : "Add Task"}
                </Button>
            </div>
        </form>
    );
};

export default FeatureForm;