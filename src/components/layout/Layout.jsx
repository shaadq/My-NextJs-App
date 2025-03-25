"use client";
import React from "react";
import "./Layout.scss";
import Sidebar from "../common/sidebar/Sidebar";
import { useAppContext } from "@/app/context/AppContext";

const Layout = (props) => {
  const { toggle } = useAppContext();
  return (
    <div className="app-container">
      <Sidebar />
      <div className={`main-container ${toggle ? "main-container-max" : "main-container"}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
