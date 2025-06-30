import Link from "next/link";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-xl font-black">track.this</span>
        </Link>
        <UserNav />
      </div>
    </header>
  );
}
