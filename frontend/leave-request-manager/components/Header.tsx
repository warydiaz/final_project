import SignOutButton from "./SignOutButton";

export default function Header(){
    return <header className="flex flex-row items-center px-3 py-4 border-b">
        <div className="font-bold"> Leave Request Manager</div>
        <div className="flex-1"></div>
        <SignOutButton/>
    </header>
}