"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/layout/Layout";
import { usePathname } from "next/navigation";
import { AppProvider } from "./context/AppContext";
import PageTitle from "@/components/page-title/pageTitle";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating load time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body className="d-flex align-items-center justify-content-center vh-100">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </body>
      </html>
    );
  }

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
