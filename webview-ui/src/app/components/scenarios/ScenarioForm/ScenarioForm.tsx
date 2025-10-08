import { useRef, useState } from "react";
import styles from "./ScenarioForm.module.css";

import Button from "@/app/components/core/Button/Button";
import InputText from "@/app/components/core/InputText/InputText";
import Select from "@/app/components/core/Select/Select";
import { getFormErrors } from "@/app/helpers/scenarios/scenarioForm";
import { addScenario } from "@/app/helpers/scenarios/scenarioMessage";
import { ScenarioType, type Scenario } from "@/app/types/scenario";

type ScenarioFormProps = {
    onSuccess: () => void;
    featureUuid: string;
}

const ScenarioForm = ({ featureUuid, onSuccess }: ScenarioFormProps) => {
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
        }
        addScenario(data);
        resetForm();
        onSuccess();
    }

    const resetForm = () => {
        ref.current?.reset();
        setIsValid(false);
        setErrors(new Map());
    }

    return (
        <form ref={ref} className={styles.form} onInput={handleInput} onSubmit={handleSubmit}>
            <Select
                name="type"
                label="Type"
                placeholder="Select a scenario type"
                options={typeOptions}
                error={errors.get("type")}
            />
            <InputText
                name="title"
                label="Title"
                placeholder="Enter scenario title"
                error={errors.get("title")}
            />
            <InputText
                name="given"
                label="Given"
                placeholder="Enter the initial context"
                error={errors.get("given")}
            />
            <InputText
                name="expected"
                label="Expected"
                placeholder="Enter the expected outcome"
                error={errors.get("expected")}
            />
            <Button type="submit" disabled={!isValid}>
                Add Scenario
            </Button>
        </form>
    );
}

export default ScenarioForm;