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

    const { error } = await supabase.from("users").update(data).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
