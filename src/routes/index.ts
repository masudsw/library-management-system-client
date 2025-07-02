import { createBrowserRouter } from "react-router";
import App from "@/App";
import Books from "@/pages/Books";
import Borrow from "@/pages/Borrow";
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
            path:"/borrow",
            Component: Borrow
        },
        {
            path:"/addbook",
            Component:AddBook
        }
    ]
  },
]);
export default router;