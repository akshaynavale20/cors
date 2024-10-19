// src/components/LoginPage.js
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setStudentName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      setStudentName(username);
      navigate("/mcqs");
    } else {
      alert("Please enter your name and password.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Typography variant="h4">EasyQuiz - Powered by Avis Computers</Typography>
      <Box sx={{ marginTop: "20px" }}>
        <TextField label="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ marginTop: "10px" }} />
        <Button variant="contained" onClick={handleLogin} sx={{ marginTop: "20px", width: "100%" }}>
          Start Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
