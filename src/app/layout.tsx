"use client"
import "@uploadthing/react/styles.css";

import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "~/lib/utils";
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
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
import { Toaster } from "~/components/ui/toaster";

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
  const { user } = useUser();

  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'godwin.pinto@cmss.in';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          {/* <div className=""> */}
          <Link href="/" className="flex flex-row items-center space-x-4">
            <img
              className="h-12 w-12"
              src="/logo.svg"
              alt="Logo"
            />
            <h1>CMackathon</h1>
          </Link>
          {/* </div> */}

          <SignedIn>
            {/* Mobile Menu */}
            <MobileNav />

            {/* Desktop Navigation */}
            <div className="md:block flex-1 px-8">
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
              {isAdmin ? (
                <>
                  <Link href="/admin/contests/create" className="block">
                    <Button variant="default" size="sm">
                      Create Contest
                    </Button>
                  </Link>
                  <Link href={`/admin/contests`} className="block">
                    <Button variant="default" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/user/participations" className="block">
                    <Button variant="default" size="sm">
                      My Participations
                    </Button>
                  </Link >
                  <Link href="/user/submissions" className="block">
                    <Button variant="default" size="sm">
                      My Submissions
                    </Button>
                  </Link >
                </>
              )}
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center">
              {/* <SignInButton>
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </SignInButton> */}
            </div>
          </SignedOut>
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
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
