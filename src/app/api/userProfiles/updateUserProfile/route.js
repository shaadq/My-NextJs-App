import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { user_id, data } = await req.json(); // Get user_id & new data

    if (!user_id || !data) {
      return NextResponse.json(
        { error: "User ID and update data are required" },
        { status: 400 }
      );
    }

    // ✅ Update user_profiles table
    const { error: updateError } = await supabaseAdmin
      .from("user_profiles")
      .update(data)
      .eq("user_id", user_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ message: "User profile updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
