import { Box, Container, Flex, Heading, IconButton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";
import { LuPlus } from "react-icons/lu";

const Navbar = () => {
  return (
    <Box
      borderBottomWidth="1px"
      bg="white"
      _dark={{
        bg: "blue.950",
        borderColor: "whiteAlpha.200",
      }}
    >
      <Container maxW="7xl">
        <Flex gap="4" padding="4" justify="space-between" align="center">
          <NavLink to="/">
            <Heading
              size="5xl"
              bgGradient="to-r"
              gradientFrom="cyan.400"
              gradientTo="blue.600"
              bgClip="text"
            >
              Product Store
            </Heading>
          </NavLink>
          <Flex gap="2">
            <NavLink to="/create">
              {({ isActive }) => (
                <IconButton
                  aria-label="Create product"
                  variant={isActive ? "outline" : "solid"}
                  size="lg"
                  bg="blue.950"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  _dark={{
                    bg: "white",
                    color: "blue.950",
                    _hover: { bg: "blue.200" },
                  }}
                >
                  <LuPlus />
                </IconButton>
              )}
            </NavLink>

            <ColorModeButton
              bg="blue.950"
              color="white"
              size="lg"
              _hover={{ bg: "blue.700" }}
              _dark={{
                bg: "white",
                color: "blue.950",
                _hover: { bg: "blue.200" },
              }}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
