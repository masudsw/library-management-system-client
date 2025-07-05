import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddBookMutation } from "@/services/books";
import { toast } from "sonner";
import { useNavigate } from "react-router";


// 1. Define form schema
const bookFormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    author: z.string().min(2, {
        message: "Author name must be at least 2 characters.",
    }),
    genre: z.string().min(1, {
        message: "Please select a genre.",
    }),
    isbn: z.string().regex(/^\d{10,13}$/, {
        message: "ISBN must be 10-13 digits.",
    }),
    copies: z.number().int().positive({
        message: "Must have at least 1 copy.",
    }),
    description: z.string().optional(),
});

export function BookForm() {
    const navigate = useNavigate();
    // 2. Initialize form
    const form = useForm<z.infer<typeof bookFormSchema>>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            title: "",
            author: "",
            genre: "",
            isbn: "",
            copies: 1,
            description: "",
        },
    });

    const [addBook, { isLoading }] = useAddBookMutation();
    // 3. Submit handler
    async function onSubmit(values: z.infer<typeof bookFormSchema>) {
        const result = await addBook(values).unwrap();
        console.log(result.success);
        if (result.success === false) {
            toast.error(result.message);

        } else {
            toast.success("Book added!");
            form.reset();
            navigate("/");
        }
    }




    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Title Field */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Book title" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Author Field */}
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Genre Field */}
                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="FICTION">FICTION</SelectItem>
                                        <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                        <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                        <SelectItem value="HISTORY">HISTORY</SelectItem>
                                        <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                        <SelectItem value="FANTASY">FANTASY</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ISBN Field */}
                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="10-13 digit ISBN" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Copies Field */}
                    <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies Available</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description Field - full width on all screens */}
                    <div className="lg:col-span-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief description of the book"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Book"}
                </Button>
            </form>

        </Form>
    );
}