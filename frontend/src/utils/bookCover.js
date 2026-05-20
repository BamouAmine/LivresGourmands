export function getBookCover(book) {
  const image = book?.image;
  if (image && typeof image === 'string' && image.trim()) {
    return image;
  }

  const idValue = Number(book?.id);
  const fallbackIndex = Number.isInteger(idValue) && idValue > 0 ? ((idValue - 1) % 4) + 1 : 1;
  return `/book-covers/cover-${fallbackIndex}.svg`;
}
