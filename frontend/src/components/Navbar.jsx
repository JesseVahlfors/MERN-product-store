import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";
import { LuPlus } from "react-icons/lu";

const Navbar = () => {
  return (
    <Flex gap="4" padding="4" justify="space-between" align="center">
      <NavLink to="/">
        <Heading size="5xl">Product Store</Heading>
      </NavLink>
      <Flex gap="2">
        <NavLink to="/create">
          {({ isActive }) => (
            <IconButton
              aria-label="Create product"
              variant={isActive ? "outline" : "solid"}
            >
              <LuPlus size={20} />
            </IconButton>
          )}
        </NavLink>

        <ColorModeButton variant="outline" />
      </Flex>
    </Flex>
  );
};

export default Navbar;
