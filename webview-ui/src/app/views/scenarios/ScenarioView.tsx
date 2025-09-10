import Header from "@/app/components/shared/Header/Header";
import Edit from "@/assets/svg/edit.svg?react";


type ScenarioViewProps = {
    params?: Record<string, string>;
}

const ScenarioView = ({ params }: ScenarioViewProps) => {
    console.log("Implement me", params);
    
    return (
        <>
            <Header title="Scenarios" icon={<Edit />} />
        </>
    );
};

export default ScenarioView;