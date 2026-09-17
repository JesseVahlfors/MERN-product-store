import {
  Input,
  InputGroup,
  VStack,
  Field,
  Container,
  Heading,
  Button,
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const createProduct = useProductStore((state) => state.createProduct);
  const creating = useProductStore((state) => state.creating);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const sampleImages = [
    {
      name: "Watch",
      url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Headphones",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Laptop",
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Camera",
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Shoes",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    },
  ];

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
      navigate("/");
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
              <Text fontSize="sm" color="fg.muted">
                Or choose a sample image:
              </Text>
              <Flex gap={2} wrap="wrap">
                {sampleImages.map((sample) => (
                  <Image
                    key={sample.url}
                    src={sample.url}
                    alt={sample.name}
                    boxSize="70px"
                    objectFit="cover"
                    rounded="md"
                    cursor="pointer"
                    borderWidth="2px"
                    borderColor={
                      newProduct.image === sample.url
                        ? "blue.500"
                        : "transparent"
                    }
                    onClick={() =>
                      setNewProduct({
                        ...newProduct,
                        image: sample.url,
                      })
                    }
                  />
                ))}
              </Flex>

              <Button
                type="submit"
                colorPalette="blue"
                w="full"
                loading={creating}
                disabled={creating}
              >
                Add Product
              </Button>

              <Button asChild variant="outline" disabled={creating}>
                <Link to="/">Cancel</Link>
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
