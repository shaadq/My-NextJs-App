"use client";
import "./Settings.scss";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();
  const tabs = [
    {
      title: "User Management",
      link: "/settings/user-management",
      icon: <MdOutlineDashboard />,
    },
    {
      title: "Documents",
      link: "/settings/document",
      icon: <AiOutlineProduct />,
    },
    {
      title: "Profile",
      link: "/settings/profile",
      icon: <MdOutlineCategory />,
    },
  ];

  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Settings</h4>
          <Logout />
        </div>
      </Header>
      <div className="content-wrapper">
        <div className="custom-tabs-wrapper">
          {tabs.map((item, index) => (
            <Link
              key={index}
              href={`${item.link}`}
              className={`custom-tab-item me-3 pb-1 ${
                pathname === item.link
                  ? "custom-tab-active text-success fw-semibold "
                  : ""
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* ✅ Works like `Outlet` */}
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}
