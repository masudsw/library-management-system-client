import { createBrowserRouter } from "react-router";
import App from "@/App";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import AddBook from "@/pages/AddBook";





const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
        {
           index:true,
           Component:Books
        },
        {
           path: "/books",
           Component: Books
        },
        {
            path:"/borrowSummary",
            Component: BorrowSummary
        },
        {
            path:"/addbook",
            Component:AddBook
        },
        
    ]
  },
]);
export default router;