import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const revalidate = 0;

export default async function Section() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }
  return (
    <main className="p-6">
     
    </main>
  );
}
