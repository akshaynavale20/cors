// src/components/MCQPage.js
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, CardContent, Grid } from "@mui/material";
import mcqData from "../data/mcqs.json";

const MCQPage = ({ studentName }) => {
  const [questions, setQuestions] = useState(mcqData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correctAnswer = questions[currentQuestionIndex]?.answer;
    setFeedback(option === correctAnswer ? "Correct!" : `Incorrect! The correct answer is ${correctAnswer}`);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption("");
    setFeedback("");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {studentName}, Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Button
                  variant={selectedOption === option ? "contained" : "outlined"}
                  onClick={() => handleOptionClick(option)}
                  sx={{ width: "100%" }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ marginTop: "20px", color: feedback === "Correct!" ? "green" : "red" }}>
            {feedback}
          </Typography>
          {currentQuestionIndex < questions.length - 1 && (
            <Button variant="contained" onClick={handleNextQuestion} sx={{ marginTop: "20px" }}>
              Next Question
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default MCQPage;
