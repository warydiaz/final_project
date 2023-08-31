import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function Header() {
  return (
    <header className="flex flex-row items-center px-3 py-4 border-b bg-gray-200">
      <div className="font-bold ml-8">
        <Link href="/">Leave Request Manager</Link>
      </div>
      <div className="flex-1"></div>
      <SignOutButton />
    </header>
  );
}
