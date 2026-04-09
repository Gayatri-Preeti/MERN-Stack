import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { createProduct, updateProduct } from "../services/api";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    if (location.state?.product) {
      const product = location.state.product;
      setFormData({
        name: product.name,
        price: product.price.toString(),
        image: product.image,
      });
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (!formData.image.trim()) {
      toast({
        title: "Error",
        description: "Product image URL is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        image: formData.image.trim(),
      };

      let response;
      if (isEditing && location.state?.product) {
        response = await updateProduct(location.state.product._id, productData);
        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        response = await createProduct(productData);
        toast({
          title: "Success",
          description: "Product created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Create product error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong while creating the product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.md">
        <VStack spacing={6}>
          {/* Header */}
          <HStack w="full" justify="space-between" align="center">
            <Button
              leftIcon={<FiArrowLeft />}
              variant="outline"
              onClick={handleGoBack}
            >
              Back to Products
            </Button>
            <Heading as="h1" size="xl" color={headingColor}>
              {isEditing ? "Edit Product" : "Create New Product"}
            </Heading>
            <Box w="100px" />
          </HStack>

          {/* Form */}
          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md" w="full">
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel color={headingColor}>Product Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color={headingColor}>Price</FormLabel>
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price (e.g., 99.99)"
                    type="number"
                    step="0.01"
                    min="0"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color={headingColor}>Image URL</FormLabel>
                  <Textarea
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    size="lg"
                    rows={3}
                  />
                </FormControl>

                {formData.image && (
                  <Box w="full">
                    <Text mb={2} color={headingColor} fontWeight="medium">
                      Image Preview:
                    </Text>
                    <Box
                      borderRadius="md"
                      overflow="hidden"
                      border="1px solid"
                      borderColor="gray.300"
                    >
                      <img
                        src={formData.image}
                        alt="Product preview"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                        }}
                      />
                    </Box>
                  </Box>
                )}

                <HStack w="full" spacing={4} pt={4}>
                  <Button
                    variant="outline"
                    onClick={handleGoBack}
                    size="lg"
                    flex={1}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    flex={1}
                    leftIcon={<FiSave />}
                    isLoading={loading}
                    loadingText={isEditing ? "Updating..." : "Creating..."}
                  >
                    {isEditing ? "Update Product" : "Create Product"}
                  </Button>
                </HStack>
              </VStack>
            </form>
          </Box>

          {/* Tips */}
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="medium">Tips:</Text>
              <Text fontSize="sm">
                - Use high-quality images for better presentation<br />
                - Set competitive prices<br />
                - Choose descriptive product names
              </Text>
            </Box>
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
};

export default CreatePage;

// npx @chakra-ui/cli snippet add//