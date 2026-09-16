import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box
      minH="100vh"
      bg="gray.50"
      _dark={{
        bg: "blue.950",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
