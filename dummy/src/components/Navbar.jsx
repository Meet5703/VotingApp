import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AcmeLogo } from "./svg/Menu";
import { useAuthHook } from "../hooks/useAuthHook";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated } = useAuthHook().useAuth();
  const menuItems = ["Home", "Participate", "Create Poll"];

  const activeStyle = {
    color: "#FFBF00",
    fontWeight: "bold",
  };
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  const username = localStorage.getItem("token")
    ? jwtDecode(token).username
    : "";
  console.log(username);

  const getLinkStyle = (path) => {
    return window.location.pathname === path
      ? activeStyle
      : { color: "#969696" };
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.replace("/login");
  };

  return (
    <Navbar
      className="mx-0 xl:min-w-[1500px] bg-[#90909020] max-w-screen-2xl"
      isBordered={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          className="text-[#969696]"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo className="text-[#969696]" />
          <p className="font-bold text-[#969696]">POLLING POOL</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="xl:-ml-[15vw] gap-4 hidden sm:flex"
        justify="around"
      >
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-[#969696]">POLLING POOL</p>
        </NavbarBrand>
        <NavbarItem className="flex gap-4">
          <NavbarItem>
            <Link style={getLinkStyle("/")} href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={window.location.pathname === "/participate"}>
            <Link style={getLinkStyle("/participate")} href="/participate">
              Participate
            </Link>
          </NavbarItem>
          <NavbarItem isActive={window.location.pathname === "/polls"}>
            <Link style={getLinkStyle("/polls")} href="/polls">
              Make Polls
            </Link>
          </NavbarItem>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="xl:-mr-[15vw]" justify="end">
        {isAuthenticated ? (
          <Dropdown>
            <DropdownTrigger>
              <Link className=" bg-gray-200 px-4 py-3 rounded-full">
                {username.slice(0, 1)}
              </Link>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onClick={handleLogout} className="text-red-600">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login" style={{ color: "#FFFFFF" }}>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="default" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
