'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Scissors } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { user, logout } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Luxe Salon
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.isGuest && (
                <span className="text-sm text-muted-foreground">Guest Mode</span>
              )}
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/booking">
                <Button variant="ghost">Booking</Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost">Services</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/services">
                <Button variant="ghost">Services</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}