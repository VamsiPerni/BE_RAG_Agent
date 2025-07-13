require("dotenv").config();
const axios = require("axios");

const groq = axios.create({
  baseURL: "https://api.groq.com/openai/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

module.exports = groq;
