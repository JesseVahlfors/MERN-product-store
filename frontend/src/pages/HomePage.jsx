import {Heading, Flex, VStack} from "@chakra-ui/react"
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import { useEffect } from "react";

const HomePage = () => {
  const products =  useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const error = useProductStore((state) => state.error);

  useEffect(() => {
  fetchProducts();
  }, [fetchProducts]);

  return (
    <VStack spacing={8}>
      <Heading size="2xl">Current Products 🚀</Heading>
      <Flex gap="6" wrap="wrap">
         {error && <p>Error: {error}</p>}
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </Flex>
    </VStack>
  );
};

export default HomePage;