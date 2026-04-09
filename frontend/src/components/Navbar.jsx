import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  useColorMode,
  useColorModeValue,
  IconButton,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { FiPlus, FiSun, FiMoon, FiGrid } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleAddProduct = () => {
    navigate('/create');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      px={6}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex align="center" maxW="container.xl" mx="auto">
        {/* Logo/Brand */}
        <HStack spacing={3} cursor="pointer" onClick={handleHomeClick}>
          <Box
            bg="blue.500"
            p={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FiGrid size={20} color="white" />
          </Box>
          <Heading size="lg" color={textColor}>
            PRODUCT STORE
          </Heading>
        </HStack>

        <Spacer />

        {/* Navigation Actions */}
        <HStack spacing={3}>
          {/* Theme Toggle */}
          <IconButton
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="outline"
            size="md"
            aria-label="Toggle theme"
          />
        </HStack>
      </Flex>

      {/* Mobile Header Info */}
      <Box
        display={{ base: 'block', md: 'none' }}
        mt={4}
        pt={4}
        borderTop="1px"
        borderColor={borderColor}
      >
        <Text fontSize="sm" color={textColor} opacity={0.7}>
          {isHomePage 
            ? 'Manage your product inventory' 
            : location.pathname === '/create' 
              ? 'Create a new product'
              : 'Product Management'}
        </Text>
      </Box>
    </Box>
  );
};

export default Navbar;
