// hooks/useBookForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { bookFormSchema } from "@/schema/shema";


export const useBookForm = (defaultValues?: Partial<z.infer<typeof bookFormSchema>>) => {
  return useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 1,
      description: "",
      ...defaultValues, // Override with passed values
    },
  });
};