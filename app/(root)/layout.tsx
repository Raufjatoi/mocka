import Image from 'next/image';
import { ReactNode } from 'react';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className="root-layout">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-900">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/m.png" alt="logo" width={38} height={32} />
          <h2 className="text-blue-400">Mocka</h2>
        </Link>

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          <Image
            src="/rauf.jpeg" // Change to your image path
            alt="Rauf"
            width={32}
            height={32}
            className="rounded-full border border-white"
          />
          <Link href="https://rauf-psi.vercel.app/" className="text-white text-sm hover:underline">
            by Rauf
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default RootLayout;
