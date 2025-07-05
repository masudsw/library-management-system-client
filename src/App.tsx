import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import Footer from "./pages/Footer"



function App() {
  return (
    <div className="min-h-screen flex flex-col w-[90%] mx-auto">
      <div className="flex-shrink-0">


        <Navbar />
      </div>

      <main className="flex-grow my-7">
        <Outlet />
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>

    </div>
  )
}

export default App