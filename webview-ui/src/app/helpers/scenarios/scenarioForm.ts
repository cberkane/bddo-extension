import { getFormErrors } from "@/app/helpers/core/form";

const getCustomError = (input: HTMLInputElement): string | undefined => {
	switch (input.name) {
		case "title":
			if (input.validity.valueMissing) return "title field is required.";
			if (input.value.trim().length < 5) return "title must be at least 5 characters."
			break;
		case "given":
			if (input.validity.valueMissing) return "given field is required.";
			break;
        case "expected":
			if (input.validity.valueMissing) return "expected field is required.";
			break;
		default:
			return "";
	}
};

export const getScenarioFormErrors = (form: HTMLFormElement): Map<string, string> => {
	return getFormErrors(form, getCustomError);
};
