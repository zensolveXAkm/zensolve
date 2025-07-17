
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact Us' },
  { href: '#about', label: 'About Us' },
];

interface HeaderProps {
  variant?: 'default' | 'transparent';
}

const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const headerClasses = cn(
    "absolute top-0 z-50 w-full",
    {
      'bg-transparent text-white': variant === 'transparent',
      'bg-background/95 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground': variant === 'default',
    }
  );
  
  const linkClasses = cn(
    "transition-colors",
    {
      'text-white/80 hover:text-white': variant === 'transparent',
      'text-foreground/60 hover:text-foreground/80': variant === 'default',
    }
  );

  return (
    <header className={headerClasses}>
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-6">
          <Globe className="h-6 w-6" />
          <span>Zensolve</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
           <Button variant="ghost" onClick={() => router.push('/signup')} className="hidden md:flex rounded-lg">Join Membership</Button>
           <Button variant={variant === 'transparent' ? 'outline' : 'default'} onClick={() => router.push('/employee/login')} className={cn(
             "hidden md:flex rounded-lg",
             {'bg-white text-primary hover:bg-white/90 border-none': variant === 'transparent'}
           )}>Employee Login</Button>
           <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-background text-foreground">
                <div className="p-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8" onClick={() => setMenuOpen(false)}>
                        <Globe className="h-6 w-6 text-primary" />
                        <span>Zensolve</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                        >
                         {link.label}
                        </Link>
                    ))}
                    </nav>
                    <div className="mt-8 border-t pt-6 flex flex-col gap-4">
                        <Button className="w-full" onClick={() => { router.push('/signup'); setMenuOpen(false); }}>Join Membership</Button>
                        <Button variant="outline" className="w-full" onClick={() => { router.push('/employee/login'); setMenuOpen(false); }}>Employee Login</Button>
                    </div>
                </div>
                </SheetContent>
            </Sheet>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
