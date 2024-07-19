import React, { ReactNode } from "react";
import Sidebar from "./sidebar/page";
import Header from "./header/Header";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
