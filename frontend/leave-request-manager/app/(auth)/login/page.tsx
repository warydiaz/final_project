"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function Page() {
  const supabase = createClientComponentClient();
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const singIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrMsg(error.toString());
    } else {
      router.replace("/");
    }
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    singIn();
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={formSubmit} className="flex flex-col border p-4 rounded">
        <label className="flex flex-col gap-2 mb-2">
          <span>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 mb-2">
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="bg-stone-200 py-1 px-3 rounded" onClick={singIn}>
          Sign-in
        </button>
      </form>
      {errMsg && <div className="text-red-600 font-bold">{errMsg}</div>}
    </main>
  );
}
