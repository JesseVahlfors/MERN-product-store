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
  const creating = useProductStore((state) => state.creating);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = async (event) => {
    event.preventDefault();
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
          <form onSubmit={handleAddProduct}>
            <VStack gap={5} align="stretch">
              <Field.Root>
                <Field.Label>Product name</Field.Label>
                <Input
                  value={newProduct.name}
                  disabled={creating}
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
                    disabled={creating}
                    min="0"
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
                  disabled={creating}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                />
              </Field.Root>

              <Button
                type="submit"
                colorPalette="blue"
                w="full"
                loading={creating}
                disabled={creating}
              >
                Add Product
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
