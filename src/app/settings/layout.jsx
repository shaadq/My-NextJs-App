"use client";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LiaUsersCogSolid } from "react-icons/lia";
import { RiProfileLine } from "react-icons/ri";
import "./Settings.scss";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();
  const tabs = [
    {
      title: "User Management",
      link: "/settings/user-management",
      icon: <LiaUsersCogSolid />,
    },
    {
      title: "Documents",
      link: "/settings/document",
      icon: <IoDocumentAttachOutline />,
    },
    {
      title: "Profile",
      link: "/settings/profile",
      icon: <RiProfileLine />,
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
              className={`custom-tab-item me-4 pb-1  ${
                pathname === item.link
                  ? "custom-tab-active text-success fw-semibold "
                  : ""
              }`}
            >
              <span className="d-flex me-1">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        {/* ✅ Works like `Outlet` */}
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}
