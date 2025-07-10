export function formatDate(dateStr: string): string {
    if (!dateStr) return "N/A";

    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
