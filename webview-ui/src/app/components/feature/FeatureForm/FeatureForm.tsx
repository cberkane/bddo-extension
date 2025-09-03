import styles from "./FeatureForm.module.css";

import Button from "@/app/components/shared/Button/Button";
import TextInput from "@/app/components/shared/InputText/InputText";
import { FeatureState, type Feature } from "@/app/models/feature.model";

type FeaturePageFormProps = {
    onSuccess: () => void;
    feature?: Feature;
    action?: FeatureState;
};

const FeatureForm = ({ onSuccess, feature, action = FeatureState.ADD_FEATURE }: FeaturePageFormProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get("title") as string,
            githubLink: formData.get("githubLink") as string
        }

        if (feature && action === FeatureState.UPDATE_FEATURE ) {
            window.vscode.postMessage({
                command: FeatureState.UPDATE_FEATURE,
                data: { uuid: feature.uuid, ...data }
            });
        } else {
            window.vscode.postMessage({
                command: FeatureState.ADD_FEATURE,
                data: { feature: { ...data, uuid: "" } }
            });
        }
        onSuccess();
    }

    // TODO: add zod validation, add required fields, do not send if contains errors
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput name="title" label="Title" placeholder="Feature title" defaultValue={feature?.title} />
            <TextInput name="githubLink" label="GitHub Link" placeholder="GitHub link" defaultValue={feature?.githubLink} />
            <Button type="submit">
                {action === FeatureState.UPDATE_FEATURE ? "Update Feature" : "Add Feature"}
            </Button>
        </form>
    );
};

export default FeatureForm;
