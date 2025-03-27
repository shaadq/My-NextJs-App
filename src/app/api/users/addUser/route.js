import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const userData = await req.json(); // Get user data from request body

    if (!userData) {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("users").insert([userData]); // Insert user data

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      message: "User added successfully",
      user: data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
