import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi=createApi({
    reducerPath: "booksApi",
    baseQuery:fetchBaseQuery({baseUrl:'https://library-management-system-eta-two.vercel.app/api'}),
    endpoints:(builder)=>({
        getAllBooks:builder.query({
            query:()=>'books'
        }),
    }),
})

export const {useGetAllBooksQuery }=booksApi