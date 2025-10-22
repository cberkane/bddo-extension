import { useRef, useState } from "react";
import styles from "./ScenarioForm.module.css";

import Button from "@/app/core/components/Button/Button";
import InputText from "@/app/core/components/InputText/InputText";
import InputTextArea from "@/app/core/components/InputTextArea/InputTextArea";
import Select from "@/app/core/components/Select/Select";
import { getScenarioFormErrors } from "@/app/scenario/helpers/scenarioForm";
import { addScenario, updateScenario } from "@/app/scenario/helpers/scenarioMessage";

import { ScenarioActionType, ScenarioType, type Scenario } from "@extension/types/scenario.type";

type ScenarioFormProps = {
    onSuccess: () => void;
    featureUuid: string;
    scenario?: Scenario;
    action?: ScenarioActionType.ADD_SCENARIO | ScenarioActionType.UPDATE_SCENARIO;
}

const ScenarioForm = ({ featureUuid, scenario, action, onSuccess }: ScenarioFormProps) => {
    const ref = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<Map<string, string>>(new Map());
    const typeOptions = Object.values(ScenarioType).map(v => ({ value: v, label: v }));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const valid = validate(event.currentTarget);
        if (!valid) return;
        submit(event);
    }

    const validate = (form: HTMLFormElement): boolean => {
        const formErrors = getScenarioFormErrors(form);
        setErrors(formErrors);
        return formErrors.size === 0;
    }

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const data: Partial<Scenario> = {
            featureUuid,
            type: formData.get("type") as ScenarioType,
            title: formData.get("title") as string,
            given: formData.get("given") as string,
            expected: formData.get("expected") as string,
        };

        if (scenario && action === ScenarioActionType.UPDATE_SCENARIO) {
            updateScenario(scenario!.uuid, data);
        } else {
            addScenario(data);
            resetForm();
        }
        onSuccess();
    }

    const resetForm = () => {
        ref.current?.reset();
        setErrors(new Map());
    }

    return (
        <form className={styles.form} ref={ref} onSubmit={handleSubmit} noValidate>
            <fieldset className={styles.formGroup}>
                <Select
                    name="type"
                    label="Type"
                    placeholder="Select a scenario"
                    defaultValue={scenario?.type}
                    options={typeOptions}
                    error={errors.get("type")}
                />
                <InputText
                    name="title"
                    label="Title"
                    placeholder="Enter scenario title"
                    defaultValue={scenario?.title}
                    required={true}
                    error={errors.get("title")}
                />
            </fieldset>
            <InputTextArea
                name="given"
                label="Given"
                placeholder="Enter the initial context"
                defaultValue={scenario?.given}
                required={true}
                error={errors.get("given")}
            />
            <InputTextArea
                name="expected"
                label="Expected"
                placeholder="Enter the expected outcome"
                defaultValue={scenario?.expected}
                required={true}
                error={errors.get("expected")}
            />
            <div className={styles.actions}>
                <Button type="submit">
                    Add Scenario
                </Button>
            </div>
        </form>
    );
}

export default ScenarioForm;