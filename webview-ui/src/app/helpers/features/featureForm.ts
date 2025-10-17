import { getFormErrors } from "@/app/helpers/core/form";

const getCustomError = (input: HTMLInputElement): string | undefined => {
	switch (input.name) {
		case "title":
			if (input.validity.valueMissing) return "title field is required.";
			if (input.value.trim().length < 5) return "title field must be at least 5 characters long.";
			break;
		case "project":
			if (input.validity.valueMissing) return "project field is required.";
			break;
		default:
			return "";
	}
};

export const getFeatureFormErrors = (form: HTMLFormElement): Map<string, string> => {
	return getFormErrors(form, getCustomError);
};
