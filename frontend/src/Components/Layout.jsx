import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";

import Nav from "./Nav";
import Footer from "./Footer";
import SideBar from "./SideBar";

export const ToggleSidebarContext = createContext(null);

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null);

  const toggleSidebar = (content) => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarContent(content);
    if (content === null) setIsSidebarOpen(false)
  };

  return (
    <div className="relative min-h-lvh">
      <Nav toggleSidebar={ toggleSidebar } sidebarContent={ sidebarContent } />
      <div className="pb-[212px] pt-80">
        <ToggleSidebarContext.Provider value={ toggleSidebar }>
          <Outlet />
        </ToggleSidebarContext.Provider>
        { isSidebarOpen && <SideBar> { sidebarContent } </SideBar> }
      </div>
      <Footer />
    </div>
  )
}

export default Layout;
