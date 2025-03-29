import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { id, data } = await req.json(); // Extract job ID and update data

    if (!id || !data) {
      return NextResponse.json(
        { error: "Job ID and data are required" },
        { status: 400 }
      );
    }

    // ✅ Update the job record
    const { error } = await supabaseAdmin
      .from("jobs")
      .update(data)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Job updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
