"use client";

import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignOutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return data.user;
  };

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <>
      <div className="mr-3">{user?.email}</div>
      <button className="bg-stone-200 py-1 px-3 rounded" onClick={signOut}>
        Sign Out
      </button>
    </>
  );
}
