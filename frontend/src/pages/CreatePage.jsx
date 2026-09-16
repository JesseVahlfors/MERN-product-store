import {
  Input,
  InputGroup,
  VStack,
  Field,
  Container,
  Heading,
  Button,
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
    <Container maxW={"container.sm"}>
      <VStack gap={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
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
        <Button colorPalette="blue" onClick={handleAddProduct} w="full">
          Add Product
        </Button>
      </VStack>
    </Container>
  );
};

export default CreatePage;
