import { Button, Flex, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";

const Navbar = () => {
  return (
    <Flex gap="4" padding="4" justify="space-between" align="center">
      <Heading size="5xl">Product Store</Heading>
        <Flex gap="2">
            <NavLink   to="/">
              {({ isActive }) => (
                <Button variant={isActive ? "solid" : "ghost"}>
                  Home
                </Button>
              )}
            </NavLink>
            <NavLink  to="/create">
              {({ isActive }) => (
                <Button variant={isActive ? "solid" : "ghost"}>
                  Create
                </Button>
              )}
            </NavLink>
            <ColorModeButton />
        </Flex>
    </Flex>
  );
};

export default Navbar;