import {
  Heading,
  Flex,
  VStack,
  Text,
  Box,
  Container,
  Button,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toaster } from "../components/ui/toaster";

const HomePage = () => {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const createProduct = useProductStore((state) => state.createProduct);
  const [loadingSamples, setLoadingSamples] = useState(false);

  const sampleProducts = [
    {
      name: "Wireless Headphones",
      price: 79.99,
      image:
        "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Mechanical Keyboard",
      price: 109.99,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Gaming Mouse",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleLoadSamples = async () => {
    setLoadingSamples(true);

    try {
      for (const product of sampleProducts) {
        const result = await createProduct(product);

        if (!result.success) {
          throw new Error(result.message);
        }
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.message || "Failed to load sample products",
        type: "error",
      });
    } finally {
      setLoadingSamples(false);
      toaster.create({
        title: "Sample products loaded",
        type: "success",
      });
    }
  };

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
            <Text fontSize="xl" fontWeight="semibold" color="fg.muted" mb={5}>
              No products found 😢
            </Text>

            <Flex gap={3} justify="center" wrap="wrap">
              <Button asChild colorPalette="blue">
                <Link to="/create">Create product</Link>
              </Button>

              <Button
                variant="outline"
                colorPalette="blue"
                onClick={handleLoadSamples}
                loading={loadingSamples}
                disabled={loadingSamples}
              >
                Load sample products
              </Button>
            </Flex>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
