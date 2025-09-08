import { useRef, useState } from "react";
import styles from "./FeatureForm.module.css";

import Button from "@/app/components/shared/Button/Button";
import TextInput from "@/app/components/shared/InputText/InputText";
import { getFormErrors } from "@/app/helpers/featureForm";
import { FeatureActionType, type Feature } from "@/app/types/feature";
import { addFeature, updateFeature } from "@/app/helpers/featureMessage";

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
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState<Map<string, string>>(new Map());

    const handleInput = () => {
        if (!ref.current) return;

        const currentErrors = getFormErrors(ref.current);
        setErrors(currentErrors);
        setIsValid(currentErrors.size === 0);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: Partial<Feature> = {
            title: formData.get("title") as string,
            project: formData.get("project") as string | undefined,
        };

        if (action === FeatureActionType.ADD_FEATURE) {
            data.completed = false;
            data.createdAt = new Date().toISOString();
            addFeature(data);

            event.currentTarget.reset();
            setIsValid(false);
            setErrors(new Map());
        }

        if (feature && action === FeatureActionType.UPDATE_FEATURE) {
            data.updatedAt = new Date().toISOString();
            updateFeature(feature.uuid, data);
        }

        onSuccess();
    };

    return (
        <form ref={ref} className={styles.form} onInput={handleInput} onSubmit={handleSubmit}>
            <TextInput
                name="title"
                label="Title"
                placeholder="Feature title"
                defaultValue={feature?.title}
                required={true}
                minLength={3}
                error={errors.get("title")}
            />
            <TextInput
                name="project"
                label="Project"
                placeholder="Project name"
                defaultValue={feature?.project}
                error={errors.get("project")}
            />
            <Button type="submit" disabled={!isValid}>
                {action === FeatureActionType.UPDATE_FEATURE ? "Update Feature" : "Add Feature"}
            </Button>
        </form>
    );
};

export default FeatureForm;