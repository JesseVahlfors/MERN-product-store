import { Image, Box, IconButton, Heading, Text, Flex } from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const ProductCard = ({ product } ) => {

  return (
    <Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
		>
        <Image 
				src={product.image} h={48} w='full' objectFit='cover' aspectRatio={4 / 3}></Image>
        <Heading>{product.name}</Heading>
        <Text fontWeight='bold' fontSize='xl' mb={4}>{product.price} €</Text>
        <Flex gap={2}>
            <IconButton aria-label="Edit product" colorPalette="blue">
                <LuPencil />
            </IconButton>
            <IconButton aria-label="Delete product" colorPalette="red">
                <LuTrash2 />
            </IconButton>
        </Flex>
    </Box>
  );
};

export default ProductCard;