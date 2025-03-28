import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { user_id } = await req.json(); // Get user_id from request body

    if (!user_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // ✅ Delete user profile from user_profiles table
    const { error: deleteError } = await supabaseAdmin
      .from("user_profiles")
      .delete()
      .eq("user_id", user_id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({ message: "User profile deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
