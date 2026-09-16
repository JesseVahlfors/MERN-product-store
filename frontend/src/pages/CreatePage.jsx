import {
  Input,
  InputGroup,
  VStack,
  Field,
  Container,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";

const CreatePage = () => {
  const createProduct = useProductStore((state) => state.createProduct);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const creating = useProductStore((state) => state.creating);

  const handleAddProduct = async () => {
    const productToCreate = {
      ...newProduct,
      price: Number(newProduct.price),
    };

    const result = await createProduct(productToCreate);

    toaster.create({
      title: result.success ? "Success" : "Error",
      description: result.message,
      type: result.success ? "success" : "error",
    });

    if (result.success) {
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW="lg" py={10}>
      <VStack gap={8}>
        <Heading
          size="3xl"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.600"
          bgClip="text"
        >
          Create New Product
        </Heading>
        <Box
          w="full"
          p={{ base: 5, md: 8 }}
          bg="white"
          _dark={{ bg: "blue.900" }}
          borderWidth="1px"
          borderColor="gray.200"
          rounded="xl"
          shadow="lg"
        >
          <VStack gap={5} align="stretch">
            <Field.Root>
              <Field.Label>Product name</Field.Label>
              <Input
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Price</Field.Label>
              <InputGroup startElement="€" endElement="EUR">
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </InputGroup>
            </Field.Root>

            <Field.Root>
              <Field.Label>Image URL</Field.Label>
              <Input
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </Field.Root>
            <Button
              colorPalette="blue"
              onClick={handleAddProduct}
              w="full"
              disabled={creating}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
