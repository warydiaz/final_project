import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest) {
    console.log("middleware running");
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req,res});
    await supabase.auth.getSession();
    return res;
}

export const config = {
    //list of server's route where I going to use supabase
    matcher: ["/"]
}