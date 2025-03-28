import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, role, name } = await req.json(); // Get user data

    // ✅ Create user in Supabase Auth and confirm email automatically
    const { data: user, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // ✅ Mark user as confirmed
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // ✅ Insert user details in "users" table
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .insert([{ id: user.user.id, email, role, name, password }]); // Storing role in the table

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    return NextResponse.json({
      message: "User registered successfully",
      user: user.user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
