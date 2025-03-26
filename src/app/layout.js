"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/layout/Layout";
import { usePathname } from "next/navigation";
import { AppProvider } from "./context/AppContext";
import PageTitle from "@/components/page-title/pageTitle";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // ✅ Exclude Layout for login page
  if (pathname === "/login") {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.svg" sizes="any" />
        </head>
        <body>
          <PageTitle /> {/* Dynamically set the page title */}
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>
        <PageTitle /> {/* Dynamically set the page title */}
        <ToastContainer
          autoClose={1000}
          position="bottom-right"
          theme="colored"
          draggable
        />
        <AppProvider>
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  );
}
