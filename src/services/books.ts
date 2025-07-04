import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-system-eta-two.vercel.app/api' }),
    tagTypes: ["All-books", "Borrow-books"],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => ({
                url: 'books',
                method: 'GET',
            }),
            providesTags: ["All-books"]
        }),


        addBook: builder.mutation({
            query: (newBook) => ({
                url: 'books',
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ["All-books"]
        }),
        deleteBook: builder.mutation({
            query: ({ id }) => ({
                url: `books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["All-books"]
        }),
        updateBook: builder.mutation({
            query: ({ id, updatedBookInfo }) => ({
                url: `books/${id}`,
                method: "PUT",
                body: updatedBookInfo,
            }),
            invalidatesTags: ["All-books"]
        }),
        addBorrow: builder.mutation({
            query: (borrowData) => ({
                url: `/borrow`,
                method: 'POST',
                body: borrowData
            }),
            invalidatesTags: ["All-books", "Borrow-books"]

        }),
        getBorrwedBooks: builder.query({
            query: () => ({
                url: '/borrow',
                method: 'GET',
            }
            ),
            providesTags: ["Borrow-books"]
        })
    })
})

export const {
    useGetAllBooksQuery,
    useAddBookMutation,
    useDeleteBookMutation,
    useUpdateBookMutation,
    useAddBorrowMutation,
    useGetBorrwedBooksQuery,
} = booksApi