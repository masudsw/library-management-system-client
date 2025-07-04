import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_TAGS } from "./apiTags";

export const borrowApi=createApi({
    reducerPath:'borrowApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://library-management-system-eta-two.vercel.app/api'}),
    tagTypes:[API_TAGS.BOOKS,API_TAGS.BORROWS],
    endpoints:(builder)=>({
        addBorrow:builder.mutation({
            query:(borrowData)=>({
                url:`/borrow`,
                method:'POST',
                body:borrowData
            }),
            invalidatesTags:[API_TAGS.BOOKS,API_TAGS.BORROWS]
            
        })
    })
    
})
export const {useAddBorrowMutation}=borrowApi