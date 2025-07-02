import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi=createApi({
    reducerPath: "booksApi",
    baseQuery:fetchBaseQuery({baseUrl:'https://library-management-system-eta-two.vercel.app/api'}),
    tagTypes:["All-books"],
    endpoints:(builder)=>({
        getAllBooks:builder.query({
            query:()=>({
                url:'books',
                method:'GET',
            }),
            providesTags:["All-books"]
        }),
        
        
        addBook:builder.mutation({
            query:(newBook)=>({
                url:'books',
                method:'POST',
                body: newBook
            }),
            invalidatesTags:["All-books"]
        })
    })
})

export const {useGetAllBooksQuery, useAddBookMutation }=booksApi