import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export const revalidate = 0;

export  async function getUser() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

 return data;
}

