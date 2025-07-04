import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BookOpenCheck, ChevronDownIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useState } from "react";
import type { IBook } from "@/types";
import { toast } from "sonner";
import { useAddBorrowMutation } from "@/services/books";


interface BookProp {
    book: IBook;
}



export function BorrowBook({ book }: BookProp) {
    const [open, setOpen] = useState(false);

    // Define validation schema
    const borrowSchema = z.object({
        bookId: z.string().min(1, "Book ID is required"),
        quantity: z.number()
            .int("Must be a whole number")
            .min(1, "Must borrow at least 1 copy")
            .max(book.copies, `Cannot borrow more than ${book.copies} available copies`),
        dueDate: z.date()
            .min(new Date(new Date().setHours(0, 0, 0, 0)), "Due date must be in the future")
    });

    const form = useForm({
        resolver: zodResolver(borrowSchema),
        defaultValues: {
            bookId: book._id,
            quantity: 1,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)) // Default to 1 week from today
        }
    });
    const [borrowBook] = useAddBorrowMutation();
    const onSubmit = async (data: z.infer<typeof borrowSchema>) => {
        let result;
        console.log(data);
        try {
            result= await borrowBook({
                book: data.bookId,
                quantity: data.quantity,
                dueDate: data.dueDate
            }).unwrap();
           


             toast.success(result.message || "Book borrowed successfully!");
            setOpen(false);
            form.reset();
        } catch (error:any) {
            const errorMessage = result?.data?.message 
                       || error?.message 
                       || "Failed to borrow book";
            toast.error("Failed to borrow book");
            console.log("result in catch error",errorMessage)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={!book.available}>
                    <BookOpenCheck className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>
                                {book.available ? `Borrow "${book.title}"` : "Book Unavailable"}
                            </DialogTitle>
                            <DialogDescription>
                                {book.available
                                    ? `Available copies: ${book.copies}`
                                    : "This book cannot be borrowed currently"}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Book ID (read-only) */}
                        <FormField
                            control={form.control}
                            name="bookId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Book ID</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Quantity */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={book.copies}
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Due Date */}
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className="w-full pl-3 text-left font-normal"
                                                >
                                                    {field.value ? (
                                                        field.value.toLocaleDateString()
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={!book.available}>
                                Borrow Book
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}