// Test API connection
const API_BASE_URL = "https://mern-stack-backend-0q3f.onrender.com/api/products";

export const testConnection = async () => {
  try {
    console.log("Testing API connection to:", API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/`);
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("API Connection Error:", error);
    throw error;
  }
};
