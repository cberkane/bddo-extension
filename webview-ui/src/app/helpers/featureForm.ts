const getCustomError = (input: HTMLInputElement): string | undefined => {
	switch (input.name) {
		case "title":
			if (input.validity.valueMissing) return "Le titre est requis.";
			if (input.value.trim().length < 3) return "Le titre doit contenir au moins 3 caractères.";
			break;
		case "project":
			if (input.validity.valueMissing) return "Le projet est requis.";
			break;
		default:
			return "";
	}
};

export const getFormErrors = (form: HTMLFormElement): Map<string, string> => {
	const errors = new Map<string, string>();
	const formData = new FormData(form);
	for (const [name] of formData.entries()) {
		const input = form.elements.namedItem(name) as HTMLInputElement;
		const error = getCustomError(input);
		if (error) errors.set(name, error);
	}
	return errors;
};
