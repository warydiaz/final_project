import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

  export default async function Home() {
    const supabase = createServerComponentClient({cookies});
    const { data } = await supabase.auth.getUser();

    if(!data.user){
      redirect("/login")
    }
    return <main>Leave Request</main>;
  }
