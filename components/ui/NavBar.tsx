'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Scissors, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { user, logout } = useStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile Menu - Visible when toggled */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {user ? (
              <>
                {user.isGuest && (
                  <span className="text-sm text-muted-foreground">Guest Mode</span>
                )}
                <Link href="/dashboard" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full text-left">Dashboard</Button>
                </Link>
                <Link href="/booking" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full text-left">Booking</Button>
                </Link>
                <Link href="/services" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full text-left">Services</Button>
                </Link>
                <Button variant="ghost" className="w-full text-left" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/services" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full text-left">Services</Button>
                </Link>
                <Link href="/login" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full text-left">Login</Button>
                </Link>
                <Link href="/register" onClick={toggleMenu}>
                  <Button className="w-full text-left bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}