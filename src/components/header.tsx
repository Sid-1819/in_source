import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import MobileNav from "./mobile-nav";

const Header = () => {
    return (
        <header className="border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <div className="rounded bg-teal-700 px-3 py-1 font-bold text-white">
                                ENGAGE
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <MobileNav />

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-4 md:flex ">
                        <NavigationMenu>
                            <NavigationMenuList>

                                <NavigationMenuItem className="px-2">
                                    <Link href="/hackathons" legacyBehavior passHref>
                                        <NavigationMenuLink >
                                            Home
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem className="px-2">
                                    <Link href="/projects" legacyBehavior passHref>
                                        <NavigationMenuLink>Projects</NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem className="px-2">
                                    <Link href="/blog" legacyBehavior passHref>
                                        <NavigationMenuLink>Blog</NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* Right section */}
                    <div className="flex items-center space-x-2">
                        <Link href="/host" className="hidden md:block">
                            <Button variant="outline" size="sm">
                                Sign Up
                            </Button>
                        </Link>


                        <Link href="/host" className="hidden md:block">
                            <Button variant="default" size="sm">
                                Login
                            </Button>
                        </Link>


                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;