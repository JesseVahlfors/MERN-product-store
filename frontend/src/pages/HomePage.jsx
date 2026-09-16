import { Heading, Flex, VStack, Text } from "@chakra-ui/react";
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
    <VStack spacing={8}>
      <Heading size="2xl">Current Products 🚀</Heading>
      <Flex gap="6" wrap="wrap">
        {error && <Text color="red.500">{error}</Text>}
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </Flex>
      {!loading && !error && products.length === 0 && (
        <Text
          fontSize="xl"
          textAlign={"center"}
          fontWeight="bold"
          color="gray.500"
        >
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text
              as="span"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Text>
          </Link>
        </Text>
      )}
    </VStack>
  );
};

export default HomePage;
