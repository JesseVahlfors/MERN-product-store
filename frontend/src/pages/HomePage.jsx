import { Heading, Flex, VStack, Text, Box, Container } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="7xl" py={10}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading
            size="3xl"
            bgGradient="to-r"
            gradientFrom="cyan.400"
            gradientTo="blue.600"
            bgClip="text"
          >
            Current Products 🚀
          </Heading>

          <Text mt={2} color="fg.muted">
            Browse and manage your product collection
          </Text>
        </Box>

        {error && (
          <Box
            p={4}
            rounded="lg"
            bg="red.50"
            color="red.700"
            _dark={{
              bg: "red.950",
              color: "red.200",
            }}
          >
            {error}
          </Box>
        )}

        <Flex gap={6} wrap="wrap" justify="center">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </Flex>

        {!loading && !error && products.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text fontSize="xl" fontWeight="semibold" color="fg.muted">
              No products found 😢
            </Text>

            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Create your first product
              </Text>
            </Link>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
