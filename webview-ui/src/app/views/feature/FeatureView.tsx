import { useState } from "react";
import styles from "./FeatureView.module.css";

import FeatureForm from "@/app/components/feature/FeatureForm/FeatureForm";
import FeatureList from "@/app/components/feature/FeatureList/FeatureList";
import Button from "@/app/components/shared/Button/Button";
import Dialog from "@/app/components/shared/Dialog/Dialog";
import useFeatureLoad from "@/app/hooks/useFeatureLoad";
import Header from "@/app/components/shared/Header/Header";

import Edit from "@/assets/svg/edit.svg?react";
import Plus from "@/assets/svg/plus.svg?react";

type FeatureViewProps = {
	params?: Record<string, string>;
};

const FeatureView = ({ params }: FeatureViewProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { features } = useFeatureLoad();
	const filteredFeatures = params?.project
		? features.filter((feature) => feature.project === params.project)
		: features;

	const handleClick = () => {
		setIsFormOpen(true);
	};

	return (
		<>
			<>
				<Header title="Features" icon={<Edit />} className={styles.header} />
				<FeatureList features={filteredFeatures} />
				<Button onClick={handleClick} variant="rounded" className={styles.fab}>
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
