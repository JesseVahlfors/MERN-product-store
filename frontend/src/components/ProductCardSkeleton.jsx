import { Box, Flex, Skeleton } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box
      w={{ base: "100%", sm: "320px" }}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Skeleton aspectRatio={4 / 3} w="full" />

      <Box p={4}>
        <Skeleton height="28px" mb={2} />
        <Skeleton height="22px" w="35%" mb={4} />

        <Flex gap={2}>
          <Skeleton boxSize="40px" rounded="md" />
          <Skeleton boxSize="40px" rounded="md" />
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCardSkeleton;
