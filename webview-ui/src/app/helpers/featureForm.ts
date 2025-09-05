const getCustomError = (input: HTMLInputElement): string => {
	if (input.name === "title") {
		if (input.validity.valueMissing) return "Le titre est requis.";
		if (input.validity.tooShort) return "Le titre doit contenir au moins 3 caractères.";
	}

	if (input.name === "project") {
		if (input.validity.valueMissing) return "Le projet est requis.";
	}
    
	return "";
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
