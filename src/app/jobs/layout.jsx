"use client";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";

export default function JobsLayout({ children }) {
  const pathname = usePathname();
  const tabs = [
    {
      title: "Listing",
      link: "/jobs/listing",
      icon: <FaRegListAlt />,
    },
    {
      title: "Categories",
      link: "/jobs/categories",
      icon: <MdOutlineCategory />,
    },
    {
      title: "Applications",
      link: "/jobs/applications",
      icon: <IoDocumentAttachOutline />,
    },
  ];

  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Jobs</h4>
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

        {/* Works like `Outlet` */}
        <div className="py-4" style={{ height: "calc(100% - 31px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
