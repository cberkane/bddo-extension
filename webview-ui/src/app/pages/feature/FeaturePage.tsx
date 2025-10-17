import { useState } from "react";
import styles from "./FeaturePage.module.css";

import FeatureForm from "@/app/components/features/FeatureForm/FeatureForm";
import FeatureList from "@/app/components/features/FeatureList/FeatureList";
import Button from "@/app/components/core/Button/Button";
import Dialog from "@/app/components/core/Dialog/Dialog";
import useFeatureLoad from "@/app/hooks/useFeatureLoad";
import Header from "@/app/components/core/Header/Header";

import Plus from "@/assets/svg/plus.svg?react";
import Desktop from "@/assets/svg/desktop.svg?react";

type FeaturePageProps = {
	projectUuid?: string;
};

const FeaturePage = ({ projectUuid }: FeaturePageProps) => {
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const { features } = useFeatureLoad();
	const filteredFeatures = projectUuid
		? features.filter((feature) => feature.projectUuid === projectUuid)
		: features;

	const handleClick = () => {
		setIsAddFormOpen(true);
	};

	return (
		<>
			<>
				<Header className={styles.header} title="Tasks" icon={<Desktop />} />
				<FeatureList features={filteredFeatures} onAddTask={handleClick} />
				{filteredFeatures.length > 0 &&
					<Button className={styles.fab} variant="rounded" onClick={handleClick}>
						<Plus className={styles.icon} />
					</Button>
				}
			</>
			<Dialog open={isAddFormOpen} onClose={() => setIsAddFormOpen(false)}>
				<FeatureForm onSuccess={() => setIsAddFormOpen(false)} />
			</Dialog>
		</>
	);
};

export default FeaturePage;
