import supabaseAdmin from "@/components/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      title,
      description,
      location,
      job_type,
      salary_from,
      salary_to,
      category_id,
      recruiter_id,
    } = await req.json(); // Extract job details from request

    if (
      !title ||
      !description ||
      !location ||
      !salary_from ||
      !job_type ||
      !salary_to ||
      !category_id ||
      !recruiter_id
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Insert new job into "jobs" table
    const { data, error } = await supabaseAdmin.from("jobs").insert([
      {
        title,
        description,
        location,
        job_type,
        salary_from,
        salary_to,
        category_id,
        recruiter_id,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Job added successfully", job: data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
