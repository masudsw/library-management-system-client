import { Link } from "react-router"; // Changed from "react-router"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/books">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Books
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/addbook">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <button className="border-t-neutral-950"><span className="text-white bg-amber-900">Add new Book</span></button>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/borrow">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Borrow
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;