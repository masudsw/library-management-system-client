import { createBrowserRouter } from "react-router";
import App from "@/App";
import Books from "@/pages/Books";
import Borrow from "@/pages/Borrow";


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
        }
    ]
  },
]);
export default router;