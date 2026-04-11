import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
  useColorModeValue,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  Icon,
  Container,
} from "@chakra-ui/react";
import { FiPlus, FiGrid } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Attempting to fetch products...");
      const response = await getProducts();
      console.log("API Response:", response);
      if (response.success) {
        setProducts(response.data);
        setError(null);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      console.error("Detailed error:", err);
      setError(`Connection error: ${err.message}`);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  const handleEditProduct = (product) => {
    // Navigate to create page with product data for editing
    navigate("/create", { state: { product } });
  };

  const handleAddProduct = () => {
    navigate("/create");
  };

  if (loading) {
    return (
      <Box bg={bgColor} minH="100vh" py={8}>
        <VStack spacing={4} justify="center" align="center" minH="60vh">
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text fontSize="lg" color={headingColor}>
            Loading products...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg={bgColor} minH="100vh" py={8}>
        <Container maxW="container.xl">
          <Alert status="error" mb={6}>
            <AlertIcon />
            {error}
          </Alert>
          <Button onClick={fetchProducts} colorScheme="blue">
            Try Again
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Box maxW="container.xl" mx="auto" px={4}>
        {/* Header */}
        <HStack justify="space-between" align="center" mb={8}>
          <VStack align="flex-start" spacing={2}>
            <Heading as="h1" size="2xl" color={headingColor}>
              Current Products
            </Heading>
            <Text color={headingColor} opacity={0.7}>
              Manage your product inventory
            </Text>
          </VStack>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            size="lg"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </HStack>

        {/* Products Grid */}
        {products.length === 0 ? (
          <VStack spacing={4} py={16} justify="center" align="center">
            <Icon as={FiGrid} boxSize={16} color={headingColor} opacity={0.3} />
            <Heading as="h2" size="lg" color={headingColor} opacity={0.7}>
              No products found
            </Heading>
            <Text color={headingColor} opacity={0.5} textAlign="center">
              Start by adding your first product to the inventory
            </Text>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              size="lg"
              onClick={handleAddProduct}
              mt={4}
            >
              Add Your First Product
            </Button>
          </VStack>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={6}
            mb={8}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
