import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id"); // Get user_id from query params

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // ✅ Fetch user profile with associated user details
    const { data: profile, error } = await supabaseAdmin
      .from("user_profiles")
      .select("*, users:users(*)") // Fetch profile and associated user details
      .eq("user_id", userId)
      .single(); // Expecting only one result

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
