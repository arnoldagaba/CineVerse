export function getGenreNames(
    genreIds: number[],
    allGenres: { id: number; name: string }[]
): string {
    return genreIds
        .map((id) => allGenres.find((genre) => genre.id === id)?.name)
        .filter(Boolean)
        .join(", ");
}
