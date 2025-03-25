"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <FiLogOut style={{ fontSize: "24px" }} onClick={handleLogout} />
    </div>
  );
};

export default Logout;
