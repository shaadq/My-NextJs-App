import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import supabaseAuth from "@/components/lib/supabaseAuth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log("Login request received for:", email);

    // Authenticate user
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login failed:", error.message);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Fetch user details from Supabase users table
    const { data: user, error: userError } = await supabaseAuth
      .from("users")
      .select("id, email, role")
      .eq("email", email.trim())
      .maybeSingle();

    if (userError) {
      console.error("Supabase query error:", userError.message);
      return NextResponse.json(
        { message: "Database error", error: userError.message },
        { status: 500 }
      );
    }
    if (!user) {
      console.warn("User not found:", email);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User fetched successfully:", user);

    // Check if role is 1 (Admin)
    if (user.role !== "1") {
      console.warn("Access denied for:", email);
      return NextResponse.json(
        { message: "Access Denied. Admins only." },
        { status: 403 }
      );
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      "5d2b265e4a31d7035704be86ab5ee53a83db72f29ed92007f10c0701d1c957d2c473ed308a1c3de45e7d335386b7ae0423d4e88c009072465c960adeaed8c0f9", // Replace with a real secret in production
      { expiresIn: "7d" }
    );

    console.log("Login successful for:", email);
    return NextResponse.json({
      message: "Login successful",
      accessToken: token, // ✅ Return token in JSON
      user, // ✅ Return user details
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
