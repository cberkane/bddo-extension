import { getFormErrors } from "@/app/helpers/core/form";

const getCustomError = (input: HTMLInputElement): string | undefined => {
	switch (input.name) {
		case "name":
			if (input.validity.valueMissing) return "name field is required.";
			if (input.value.trim().length < 3) return "name field must be at least 3 characters long.";
			break;
        default:
			return "";
	}
};

export const getProjectFormErrors = (form: HTMLFormElement): Map<string, string> => {
	return getFormErrors(form, getCustomError);
};
