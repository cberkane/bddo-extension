import Header from "@/app/components/shared/Header/Header";
import Edit from "@/assets/svg/edit.svg?react";


type ScenarioViewProps = {
    params: Record<string, string>;
}

const ScenarioView = ({ params }: ScenarioViewProps) => {
    return (
        <>
            <Header title={`Scenario: ${params['scenarioId']}`} icon={<Edit />} />
        </>
    );
};

export default ScenarioView;