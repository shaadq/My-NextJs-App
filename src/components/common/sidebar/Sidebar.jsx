"use client";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineProduct, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import "./Sidebar.scss";

const Sidebar = () => {
  const { toggle } = useAppContext();
  const pathname = usePathname(); // Get current route

  const list = [
    { title: "Dashboard", link: "/dashboard", icon: <MdOutlineDashboard /> },
    { title: "Jobs", link: "/jobs", icon: <MdOutlineCategory /> },
    { title: "Companies", link: "/companies", icon: <AiOutlineProduct /> },
    { title: "Settings", link: "/settings", icon: <AiOutlineSetting /> },
  ];

  return (
    <div
      className={`sidebar bg-success text-white ${
        toggle ? "hide-sidebar" : ""
      }`}
    >
      <h2 className="text-center mt-3">My App</h2>
      <div className="sidebar-list mt-5 px-3">
        {list.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={`sidebar-item ${
              pathname.startsWith(item.link) ? "active" : ""
            }`}
          >
            <div className="me-2 d-flex">{item.icon}</div>
            <div className="item fw-semibold">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
