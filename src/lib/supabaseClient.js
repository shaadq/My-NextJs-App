import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pdajrckmeztcxatgeuhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYWpyY2ttZXp0Y3hhdGdldWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzA1OTE1OCwiZXhwIjoyMDU4NjM1MTU4fQ.RLYC_7smNx3IJF5BzG8LHMnnbmoBr-Bu3dR2bFvinwU";

export const supabase = createClient(supabaseUrl, supabaseKey);
