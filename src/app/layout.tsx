"use client"
import "@uploadthing/react/styles.css";

import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "~/lib/utils";
import { ClerkProvider } from '@clerk/nextjs'
import Link from "next/link";
import { Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

const MobileNav = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <nav className="mt-6 flex flex-col space-y-4 space-x-4">
          <Link href="/" className="text-lg font-medium">
            Home
          </Link>
          <Link href="/leaderboard" className="text-lg font-medium ">
            Leaderboard
          </Link>
          <Link href="/prizes" className="text-lg font-medium">
            Prizes
          </Link>
        </nav>
      </DialogContent>
    </Dialog>
  );
};

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-row items-center space-x-4">
            <Link href="/" className="flex items-center">
              <img
                className="h-12 w-12"
                src="/logo.svg"
                alt="Logo"
              />
            
            </Link>
            <h1>CMackathon</h1>
          </div>

          {/* Mobile Menu */}
          <MobileNav />

          {/* Desktop Navigation */}
          <div className=" md:block flex-1 px-8">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList>
                <NavigationMenuItem className="px-8">
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "font-medium transition-colors hover:text-primary",
                        pathname === "/" 
                          ? "text-primary border-b-2 border-primary" 
                          : "text-muted-foreground"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem className="px-8">
                  <Link href="/leaderboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "font-medium transition-colors hover:text-primary",
                        pathname === "/leaderboard" 
                          ? "text-primary border-b-2 border-primary" 
                          : "text-muted-foreground"
                      )}
                    >
                      Leaderboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem className="px-8">
                  <Link href="/prizes" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "font-medium transition-colors hover:text-primary",
                        pathname === "/prizes" 
                          ? "text-primary border-b-2 border-primary" 
                          : "text-muted-foreground"
                      )}
                    >
                      Season Prizes
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="px-8">
                  <Link href="/rules" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "font-medium transition-colors hover:text-primary",
                        pathname === "/rules" 
                          ? "text-primary border-b-2 border-primary" 
                          : "text-muted-foreground"
                      )}
                    >
                      Rules
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            <Link href="/create" className="block">
              <Button variant="default" size="sm">
                Create Contest
              </Button>
            </Link>
            <Link href="/host" className="block">
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </Link>
            <Link href="/host" className="block">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("antialiased", GeistSans.variable)}>
        <body className="min-h-screen bg-background">
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
