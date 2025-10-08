const getCustomError = (input: HTMLInputElement): string | undefined => {
	switch (input.name) {
		case "type":
			if (input.validity.valueMissing) return "Le type est requis.";
			break;
		case "title":
			if (input.validity.valueMissing) return "Le titre est requis.";
			if (input.value.trim().length < 3) return "Le titre doit contenir au moins 3 caractères.";
			break;
        case "expected":
			if (input.validity.valueMissing) return "Le résultat attendu est requis.";
			break;
		default:
			return "";
	}
};

// TODO: factorize with featureForm
export const getFormErrors = (form: HTMLFormElement): Map<string, string> => {
	const errors = new Map<string, string>();
    
    const formData = new FormData(form);
	for (const [key] of formData.entries()) {
		const input = form.elements.namedItem(key) as HTMLInputElement;
		const error = getCustomError(input);
		if (error) errors.set(key, error);
	}
	return errors;
};
