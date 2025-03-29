import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch users where role = "2" (Recruiters)
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("role", "2");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ recruiters: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
