import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { location, contact, user_id } = await req.json();

    // ✅ Validate required fields
    if (!location || !contact || !user_id) {
      return NextResponse.json(
        { error: "All fields (location, contact, user_id) are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user exists in `users` table
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", user_id)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found. Please provide a valid user_id" },
        { status: 400 }
      );
    }

    // ✅ Insert new profile into `user_profiles` table
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .insert([{ location, contact, user_id }]);

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User profile added successfully", profile },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
