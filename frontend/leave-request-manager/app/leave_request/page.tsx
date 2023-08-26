import { redirect } from "next/navigation";
import { getUser } from "../userData";

export const revalidate = 0;

export default async function LeaveRequest() {
 
  const data  = (await getUser()).user;

  if (!data) {
    redirect("/login");
  }
  return (
   <></>
  );
}
