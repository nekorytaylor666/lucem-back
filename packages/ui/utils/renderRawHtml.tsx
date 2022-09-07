import DOMPurify from "dompurify";

export const toCleanHtml = (dirtyHTML: string): string => {
  return DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });
};
