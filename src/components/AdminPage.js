// src/components/AdminPage.js
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import mcqData from "../data/mcqs.json";

const AdminPage = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [mcqs, setMcqs] = useState(mcqData);  // Simulated existing MCQs

  // Handle changes to options
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Simulate saving the question
  const handleSaveQuestion = () => {
    const newMCQ = {
      question,
      options,
      answer,
    };

    // Simulate saving to JSON data
    setMcqs([...mcqs, newMCQ]);

    // Clear inputs
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Panel - Add New MCQs
      </Typography>

      <TextField
        label="Enter Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        sx={{ marginBottom: "20px" }}
      />

      <Grid container spacing={2}>
        {options.map((option, index) => (
          <Grid item xs={6} key={index}>
            <TextField
              label={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        ))}
      </Grid>

      <TextField
        label="Correct Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        fullWidth
        sx={{ marginTop: "20px" }}
      />

      <Button
        variant="contained"
        onClick={handleSaveQuestion}
        sx={{ marginTop: "20px", width: "100%" }}
      >
        Save Question
      </Button>

      <Box sx={{ marginTop: "30px" }}>
        <Typography variant="h6">Current MCQs:</Typography>
        {mcqs.map((mcq, index) => (
          <Typography key={index} sx={{ marginTop: "10px" }}>
            {index + 1}. {mcq.question}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default AdminPage;
