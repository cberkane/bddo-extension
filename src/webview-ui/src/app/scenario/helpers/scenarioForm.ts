import { getFormErrors } from "@/app/core/helpers/form";

const getCustomError = (input: HTMLInputElement): string | undefined => {
	switch (input.name) {
		case "title":
			if (input.validity.valueMissing) return "Title is required.";
			if (input.value.trim().length < 5) return "Title must be at least 5 characters."
			break;
		case "given":
			if (input.validity.valueMissing) return "Given is required.";
			break;
        case "expected":
			if (input.validity.valueMissing) return "Expected is required.";
			break;
		default:
			return "";
	}
};

export const getScenarioFormErrors = (form: HTMLFormElement): Map<string, string> => {
	return getFormErrors(form, getCustomError);
};
