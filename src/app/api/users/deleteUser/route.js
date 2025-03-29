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

    // ✅ Step 1: Fetch the user's role
    const { data: user, error: userFetchError } = await supabaseAdmin
      .from("users")
      .select("role")
      .eq("id", id)
      .single();

    if (userFetchError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Step 2: If the user is a recruiter (role === "2"), check if they have any jobs
    if (user.role === "2") {
      const { data: jobs, error: jobsError } = await supabaseAdmin
        .from("jobs")
        .select(
          "id, title, created_at, status, job_categories!category_id(name)"
        ) // Explicit join using foreign key
        .eq("recruiter_id", id);

      if (jobsError) {
        console.error("Error fetching jobs:", jobsError.message);
        return NextResponse.json(
          { error: "Failed to check jobs for this recruiter" },
          { status: 500 }
        );
      }

      if (jobs.length > 0) {
        return NextResponse.json(
          {
            error: "This recruiter has linked jobs",
            jobs: jobs.map((job) => ({
              id: job.id,
              title: job.title,
              status: job.status,
              created_at: job.created_at,
              category_name: job.job_categories?.name || "Uncategorized", // Corrected mapping
            })),
          },
          { status: 400 }
        );
      }
    }

    // ✅ Step 3: Delete from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      console.error("Auth Deletion Error:", authError.message);
      return NextResponse.json(
        { error: `Failed to delete from auth: ${authError.message}` },
        { status: 500 }
      );
    }

    // ✅ Step 4: Delete from "users" table
    const { error: userError } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", id);

    if (userError) {
      console.error("User Deletion Error:", userError.message);
      return NextResponse.json(
        { error: `Failed to delete from users table: ${userError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error.message);
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
