import { Outlet } from "react-router"
import Navbar from "./components/Navbar"


function App() {
  return (
    <div className="mx-5 my-7">
      <Navbar/>
       <Outlet/>
    </div>
  )
}

export default App