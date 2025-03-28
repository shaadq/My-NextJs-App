import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    console.log("User ID to delete:", id);

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // ✅ Step 1: Delete from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      return NextResponse.json(
        { error: `Failed to delete from auth: ${authError.message}` },
        { status: 500 }
      );
    }

    // ✅ Step 2: Delete from "users" table
    const { error: userError } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", id);

    if (userError) {
      return NextResponse.json(
        { error: `Failed to delete from users table: ${userError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully from Auth and Users table" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
