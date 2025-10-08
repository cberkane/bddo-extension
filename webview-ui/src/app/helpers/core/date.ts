export const getFormattedDate = (date: string | undefined): string => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
