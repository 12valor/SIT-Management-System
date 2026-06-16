export function getPublicImageUrl(url: string | null | undefined) {
  if (!url || url.startsWith("data:")) return null;
  return url;
}
