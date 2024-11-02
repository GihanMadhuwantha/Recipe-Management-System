import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const Header = () => {
  return (
    <header className="w-full px-4 py-3 flex items-center justify-between bg-white shadow-sm">
      <Link href="/" className="text-2xl font-semibold text-coral-500">
        <span className="flex items-center">
          cook
          <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1 rotate-45">
            <path fill="currentColor" d="M20 4v16H4V4h16m2-2H2v20h20V2z" />
          </svg>
        </span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-gray-700 hover:text-gray-900">
          HOME
        </Link>
        <Link href="/favorites" className="text-gray-700 hover:text-gray-900">
          FAVOURITES
        </Link>
        <LogOut
          className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900"
          onClick={() => signOut()} 
        />
      </nav>
    </header>
  );
};
