// src/services/apiTags.ts
export const API_TAGS = {
  BOOKS: "Books",
  BORROWS: "Borrows",
} as const;

export type ApiTags = (typeof API_TAGS)[keyof typeof API_TAGS];