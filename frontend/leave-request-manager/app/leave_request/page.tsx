import { redirect } from "next/navigation";
import {getUser} from "../userData";

export const revalidate = 0;

export default async function LeaveRequest() {
 
  const data  = getUser();

  if (!data.user) {
    redirect("/login");
  }
  return (
    <></>
  );
}
