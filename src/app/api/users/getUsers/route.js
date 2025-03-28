import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .order("created_at", { ascending: false }); // Sorting by created_at in descending order;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
