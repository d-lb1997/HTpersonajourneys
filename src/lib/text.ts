/** Removes source tags such as [S3, slide 8] from a text. */
export const stripSources = (text: string) => text.replace(/\s*\[S\d[^\]]*\]/g, "").replace(/\s+([.,;:])/g, "$1").trim();
