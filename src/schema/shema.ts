// schemas.ts
import { z } from "zod";


// Create Zod schema matching IBook with validation
export const bookFormSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    author: z.string().min(2, "Author must be at least 2 characters"),
    genre: z.string().min(1, "Please select a genre"),
    isbn: z.string().regex(/^\d{10,13}$/, "ISBN must be 10-13 digits"),
    copies: z.number().int().positive("Must have at least 1 copy"),
    // Note: 'available' is omitted since it's server-managed
    description: z.string().optional() // Add if needed
});

// Infer TypeScript type from Zod schema
export type BookFormValues = z.infer<typeof bookFormSchema>;