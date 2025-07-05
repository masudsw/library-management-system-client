
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <header className="bg-gray-100 dark:bg-gray-900 border-b px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo or App Name */}
        <div className="text-lg font-semibold text-gray-800 dark:text-white">
          <Link to="/">📚 LibraryManagemet</Link>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link to="/books">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  All Books
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/addbook">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Add Book
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/borrowSummary">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Borrow Summary
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
