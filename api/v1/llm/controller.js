const groq = require("./groqClient");
const { connectDB } = require("../../../drizzle/config.js");
const { assets, transactions } = require("../../../drizzle/schema.js");
const { User } = require("../../../models/user_schema");

const askController = async (req, res) => {
  const { question } = req.body;
  if (!question)
    return res.status(400).json({ message: "Question is required" });

  try {
    const [userList, assetList, transactionList] = await Promise.all([
      User.find().lean(),
      connectDB().then((db) => db.select().from(assets)),
      connectDB().then((db) => db.select().from(transactions)),
    ]);

    const context = {
      users: userList,
      assets: assetList,
      transactions: transactionList,
    };

    const systemPrompt = `You are a financial assistant. Given the following data, return the result in this JSON format:
{
  "summary": "...",
  "response_type": "table",
  "columns": [...],
  "data": [...],
  "chart": {
    "type": "bar",
    "labels": [...],
    "values": [...]
  }
}
${JSON.stringify(context)}
Answer the user's question accurately. Only return a valid JSON object with no explanation or markdown formatting.Don't give any answer if you are not able to give the answer in JSON format.Don't mention anything before and after the JSON Format...only JSON format is required`;

    const response = await groq.post("", {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      max_tokens: 1024,
      temperature: 0.3,
    });

    const answerString = response.data.choices?.[0]?.message?.content;

    let parsedAnswer;
    try {
      parsedAnswer = JSON.parse(answerString);
    } catch (parseError) {
      console.error("Failed to parse LLM response:", parseError.message);
      return res.status(500).json({ message: "Invalid LLM response format" });
    }

    return res.json(parsedAnswer);
  } catch (err) {
    console.error("LLM error:", err.response?.data || err.message);
    res.status(500).json({ message: "Error processing question" });
  }
};

module.exports = { askController };
