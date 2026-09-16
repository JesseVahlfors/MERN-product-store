import { Image, Box, IconButton, Heading, Text, Flex } from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";

const ProductCard = ({ product }) => {
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const handleDeleteProduct = async (id) => {
    const result = await deleteProduct(id);

    toaster.create({
      title: result.success ? "Success" : "Error",
      description: result.message,
      type: result.success ? "success" : "error",
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        h={48}
        w="full"
        objectFit="cover"
        aspectRatio={4 / 3}
      ></Image>
      <Heading>{product.name}</Heading>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        {product.price} €
      </Text>
      <Flex gap={2}>
        <IconButton aria-label="Edit product" colorPalette="blue">
          <LuPencil />
        </IconButton>
        <IconButton
          aria-label="Delete product"
          colorPalette="red"
          onClick={() => handleDeleteProduct(product._id)}
        >
          <LuTrash2 />
        </IconButton>
      </Flex>
    </Box>
  );
};

export default ProductCard;
