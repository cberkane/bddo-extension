export const getFormErrors = (
    form: HTMLFormElement, 
    getError: (input: HTMLInputElement) => string | undefined,
): Map<string, string> => {
	const formData = new FormData(form);
	const formErrors = new Map<string, string>();
	for (const [key] of formData.entries()) {
		const input = form.elements.namedItem(key) as HTMLInputElement;
		const error = getError(input);
		if (error) formErrors.set(key, error);
	}
	return formErrors;
};
