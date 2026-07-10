import sanitizeHtml from "sanitize-html";

export function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

export function sanitizeObject(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const key in obj) {
    const value = obj[key];

    sanitized[key] =
      typeof value === "string"
        ? sanitizeInput(value)
        : value;
  }

  return sanitized;
}