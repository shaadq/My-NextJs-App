import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: profiles, error } = await supabaseAdmin
      .from("user_profiles")
      .select("*, users:users(*)"); // Fetch all columns from user_profiles & associated users

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
