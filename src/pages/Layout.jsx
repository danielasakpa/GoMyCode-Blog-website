import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import React from "react";

function Layout() {
  return (
    <div className="mx-auto lg:w-5/6">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
