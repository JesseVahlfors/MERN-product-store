import {
  Image,
  Box,
  IconButton,
  Heading,
  Text,
  Flex,
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  InputGroup,
} from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const [open, setOpen] = useState(false);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const updating = useProductStore((state) => state.updating);
  const deletingId = useProductStore((state) => state.deletingId);

  const handleDeleteProduct = async (id) => {
    const result = await deleteProduct(id);

    toaster.create({
      title: result.success ? "Success" : "Error",
      description: result.message,
      type: result.success ? "success" : "error",
    });
  };

  const handleUpdateProduct = async (id, productData) => {
    const updatedProductData = {
      ...productData,
      price: Number(productData.price),
    };
    const result = await updateProduct(id, updatedProductData);

    toaster.create({
      title: result.success ? "Success" : "Error",
      description: result.message,
      type: result.success ? "success" : "error",
    });

    if (result.success) {
      setOpen(false);
    }
  };

  const handleOpenChange = (details) => {
    setOpen(details.open);

    if (details.open) {
      setUpdatedProduct(product);
    }
  };

  return (
    <Box
      w={{ base: "100%", sm: "320px" }}
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      _dark={{
        bg: "blue.900",
        borderColor: "whiteAlpha.200",
      }}
      shadow="md"
      rounded="xl"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
    >
      <Image
        src={product.image}
        w="full"
        objectFit="cover"
        aspectRatio={4 / 3}
      ></Image>
      <Box p={4}>
        <Heading size="lg">{product.name}</Heading>
        <Text fontWeight="bold" fontSize="xl" mb={4}>
          {product.price} €
        </Text>
        <Flex gap={2}>
          <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Trigger asChild>
              <IconButton
                aria-label="Edit product"
                bg="blue.950"
                color="white"
                _hover={{ bg: "blue.900" }}
                _dark={{
                  bg: "white",
                  color: "blue.950",
                  _hover: { bg: "blue.200" },
                }}
              >
                <LuPencil />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <Field.Root>
                      <Field.Label>Product name</Field.Label>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Price</Field.Label>
                      <InputGroup startElement="€" endElement="EUR">
                        <Input
                          placeholder="Price"
                          name="price"
                          type="number"
                          value={updatedProduct.price}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              price: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Image URL</Field.Label>
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </Field.Root>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Button
                      colorPalette="blue"
                      mr={3}
                      onClick={() =>
                        handleUpdateProduct(product._id, updatedProduct)
                      }
                      loading={updating}
                    >
                      Update
                    </Button>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="ghost">Cancel</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <IconButton
            aria-label="Delete product"
            colorPalette="red"
            onClick={() => handleDeleteProduct(product._id)}
            disabled={deletingId === product._id}
          >
            <LuTrash2 />
          </IconButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
