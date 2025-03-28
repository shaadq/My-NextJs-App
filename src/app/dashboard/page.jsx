"use client";
import { useEffect, useState } from "react";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import Cookies from "js-cookie";

export default function Page() {
  const [user, setUser] = useState(null);
  const cookieToken = Cookies.get("user");

  useEffect(() => {
    setUser(JSON.parse(cookieToken));
  }, []);

  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Dashboard</h4>
          <Logout />
        </div>
      </Header>
      <div className="content-wrapper">
        <h2>Welcome</h2>
      </div>
    </div>
  );
}
