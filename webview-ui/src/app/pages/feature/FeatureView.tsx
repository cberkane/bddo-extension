import { useState } from "react";
import styles from "./FeatureView.module.css";

import FeatureForm from "@/app/components/features/FeatureForm/FeatureForm";
import FeatureList from "@/app/components/features/FeatureList/FeatureList";
import Button from "@/app/components/core/Button/Button";
import Dialog from "@/app/components/core/Dialog/Dialog";
import useFeatureLoad from "@/app/hooks/useFeatureLoad";
import Header from "@/app/components/core/Header/Header";

import Edit from "@/assets/svg/edit.svg?react";
import Plus from "@/assets/svg/plus.svg?react";

type FeatureViewProps = {
	projectUuid?: string;
};

const FeatureView = ({ projectUuid }: FeatureViewProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { features } = useFeatureLoad();
	const filteredFeatures = projectUuid
		? features.filter((feature) => feature.projectUuid === projectUuid)
		: features;

	const handleClick = () => {
		setIsFormOpen(true);
	};

	return (
		<>
			<>
				<Header className={styles.header} title="Features" icon={<Edit />} />
				<FeatureList features={filteredFeatures} />
				<Button className={styles.fab} variant="rounded" onClick={handleClick}>
					<Plus className={styles.icon} />
				</Button>
			</>
			
			<Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
				<FeatureForm onSuccess={() => setIsFormOpen(false)} />
			</Dialog>
		</>
	);
};

export default FeatureView;
