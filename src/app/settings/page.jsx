"use client";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";

export default function Page() {
  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Settings</h4>
          <Logout />
        </div>
      </Header>
      <div className="content-wrapper">
        <h2>Settings page</h2>
      </div>
    </div>
  );
}
