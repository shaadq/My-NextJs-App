import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function PUT(req) {
  try {
    const { id, data } = await req.json(); // Get ID & new data from request body

    if (!id || !data) {
      return NextResponse.json(
        { error: "ID and data are required" },
        { status: 400 }
      );
    }

    // ✅ 1. Update the `users` table
    const { error: userError } = await supabase
      .from("users")
      .update(data)
      .eq("id", id);

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    // ✅ 2. Update Supabase Auth table (`auth.users`)
    const authUpdateData = {};

    if (data.email) authUpdateData.email = data.email; // Update email if provided
    if (data.name) authUpdateData.user_metadata = { name: data.name }; // Update display name

    if (Object.keys(authUpdateData).length > 0) {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        id,
        authUpdateData
      );
      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
