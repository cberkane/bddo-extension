import { useRef, useState } from "react";
import styles from "./ScenarioForm.module.css";

import Button from "@/app/components/core/Button/Button";
import InputText from "@/app/components/core/InputText/InputText";
import InputTextArea from "@/app/components/core/InputTextArea/InputTextArea";
import Select from "@/app/components/core/Select/Select";
import { getFormErrors } from "@/app/helpers/scenarios/scenarioForm";
import { addScenario, updateScenario } from "@/app/helpers/scenarios/scenarioMessage";
import { ScenarioActionType, ScenarioType, type Scenario } from "@/app/types/scenario";

type ScenarioFormProps = {
    onSuccess: () => void;
    featureUuid: string;
    scenario?: Scenario;
    action?: ScenarioActionType.ADD_SCENARIO | ScenarioActionType.UPDATE_SCENARIO;
}

const ScenarioForm = ({ featureUuid, scenario, action, onSuccess }: ScenarioFormProps) => {
    const ref = useRef<HTMLFormElement>(null);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState<Map<string, string>>(new Map());

    const typeOptions = Object.values(ScenarioType).map(v => ({
        value: v,
        label: v,
    }));

    const handleInput = () => {
        if (!ref.current) return;

        const currentErrors = getFormErrors(ref.current);
        setErrors(currentErrors);
        setIsValid(currentErrors.size === 0);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
        setIsValid(false);
        setErrors(new Map());
    }

    return (
        <form className={styles.form} ref={ref} onInput={handleInput} onSubmit={handleSubmit}>
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
                    required={true}
                    defaultValue={scenario?.title}
                    error={errors.get("title")}
                />
            </fieldset>
            <InputTextArea
                name="given"
                label="Given"
                placeholder="Enter the initial context"
                required={true}
                defaultValue={scenario?.given}
                error={errors.get("given")}
            />
            <InputTextArea
                name="expected"
                label="Expected"
                placeholder="Enter the expected outcome"
                required={true}
                defaultValue={scenario?.expected}
                error={errors.get("expected")}
            />
            <div className={styles.actions}>
                <Button type="submit" disabled={!isValid}>
                    Add Scenario
                </Button>
            </div>
        </form>
    );
}

export default ScenarioForm;