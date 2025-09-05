import { useRef, useState } from "react";
import styles from "./FeatureForm.module.css";

import Button from "@/app/components/shared/Button/Button";
import TextInput from "@/app/components/shared/InputText/InputText";
import { getFormErrors } from "@/app/helpers/featureForm";
import { FeatureState, type Feature } from "@/app/models/feature.model";

type FeaturePageFormProps = {
    onSuccess: () => void;
    feature?: Feature;
    action?: FeatureState;
};

const FeatureForm = ({
    onSuccess,
    feature,
    action = FeatureState.ADD_FEATURE,
}: FeaturePageFormProps) => {
    const ref = useRef<HTMLFormElement>(null);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState<Map<string, string>>(new Map());

    const handleInput = () => {
        if (!ref.current) return;

        setIsValid(ref.current.checkValidity());
        const newErrors = getFormErrors(ref.current);
        setErrors(newErrors);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get("title") as string,
            project: formData.get("project") as string | undefined,
        };

        if (feature && action === FeatureState.UPDATE_FEATURE) {
            window.vscode.postMessage({
                command: FeatureState.UPDATE_FEATURE,
                data: { uuid: feature.uuid, updatedFeature: data },
            });
        } else {
            window.vscode.postMessage({
                command: FeatureState.ADD_FEATURE,
                data: { feature: { ...data } },
            });
            event.currentTarget.reset();
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
                {action === FeatureState.UPDATE_FEATURE ? "Update Feature" : "Add Feature"}
            </Button>
        </form>
    );
};

export default FeatureForm;