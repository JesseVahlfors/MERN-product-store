import {Heading, Flex, VStack} from "@chakra-ui/react"
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const products =[
    {
    id: 1,
    name: "Laptop",
    price: 999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Headphones",
    price: 299,
    image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Mouse",
    price: 129,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  ];

  return (
    <VStack spacing={8}>
      <Heading size="2xl">Current Products 🚀</Heading>
      <Flex gap="6" wrap="wrap">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </Flex>
    </VStack>
  );
};

export default HomePage;