"use client";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import { useState } from "react";
import "./Companies.scss";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Companies</h4>
          <Logout />
        </div>
      </Header>

      <div className="content-wrapper"></div>
    </div>
  );
}
