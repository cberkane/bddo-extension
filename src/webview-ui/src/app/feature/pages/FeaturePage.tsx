import { useState } from "react";
import styles from "./FeaturePage.module.css";

import Button from "@/app/core/components/Button/Button";
import Dialog from "@/app/core/components/Dialog/Dialog";
import Header from "@/app/core/components/Header/Header";
import PageWrapper from "@/app/core/components/PageWrapper/PageWrapper";
import FeatureForm from "@/app/feature/components/FeatureForm/FeatureForm";
import FeatureList from "@/app/feature/components/FeatureList/FeatureList";
import useFeatureLoad from "@/app/feature/hooks/useFeatureLoad";

import Desktop from "@/assets/svg/desktop.svg?react";
import Plus from "@/assets/svg/plus.svg?react";

type FeaturePageProps = {
	projectUuid?: string;
};

const FeaturePage = ({ projectUuid }: FeaturePageProps) => {
	const { features, loading } = useFeatureLoad();
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const filteredFeatures = projectUuid
		? features.filter((feature) => feature.projectUuid === projectUuid)
		: features;

	const handleClick = () => {
		setIsAddFormOpen(true);
	};

	return (
		<PageWrapper loading={loading}>
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
		</PageWrapper>
	);
};

export default FeaturePage;
