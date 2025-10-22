import { getFormErrors } from "@/app/core/helpers/form";

const getCustomError = (input: HTMLInputElement): string | undefined => {
	switch (input.name) {
		case "title":
			if (input.validity.valueMissing) return "Title is required.";
			if (input.value.trim().length < 5) return "Title must be at least 5 characters long.";
			break;
		case "project":
			if (input.validity.valueMissing) return "Project is required.";
			break;
		default:
			return "";
	}
};

export const getFeatureFormErrors = (form: HTMLFormElement): Map<string, string> => {
	return getFormErrors(form, getCustomError);
};
