import {Heading, Flex, VStack} from "@chakra-ui/react"
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null)


  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
    .then((response)=> response.json())
    .then((data) => {

      setProducts(data.data);
    })
    .catch((error)=> {
      setError(error.message);
    });

  }, [])

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