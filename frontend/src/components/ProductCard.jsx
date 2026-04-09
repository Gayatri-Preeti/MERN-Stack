import {
  Box,
  Image,
  Text,
  Button,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteProduct } from "../services/api";

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProduct(product._id);
      toast({
        title: "Product deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDelete(product._id);
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    onEdit(product);
  };

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Image
        src={product.image}
        alt={product.name}
        height="200px"
        width="100%"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/300x200?text=Product+Image"
      />
      <Box p={6}>
        <Text
          fontSize="xl"
          fontWeight="semibold"
          mb={2}
          noOfLines={1}
          title={product.name}
        >
          {product.name}
        </Text>
        <Text fontSize="2xl" color="blue.400" fontWeight="bold" mb={4}>
          ${product.price.toFixed(2)}
        </Text>
        <HStack spacing={3}>
          <Button
            leftIcon={<FiEdit />}
            colorScheme="blue"
            variant="outline"
            size="sm"
            flex={1}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            leftIcon={<FiTrash2 />}
            colorScheme="red"
            variant="outline"
            size="sm"
            flex={1}
            onClick={handleDelete}
            isLoading={isDeleting}
            loadingText="Deleting"
          >
            Delete
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
