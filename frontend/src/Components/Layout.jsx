import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="relative min-h-lvh">
        <Nav />
            <div className="pb-[212px]">
            <Outlet/>  
            </div>
        <Footer />
      </div>
    );
  }
  
  export default Layout;
