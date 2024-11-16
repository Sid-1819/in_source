import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Menu, Link } from "lucide-react";
import { Button } from "~/components/ui/button";


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
                    <Link href="/hackathons" className="text-lg font-medium">
                        Home
                    </Link>
                    <Link href="/projects" className="text-lg font-medium ">
                        Leaderboard
                    </Link>
                    <Link href="/blog" className="text-lg font-medium">
                        Prizes
                    </Link>
                </nav>
            </DialogContent>
        </Dialog>
    );
};

export default MobileNav