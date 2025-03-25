"use client";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/settings/user-management");
}
