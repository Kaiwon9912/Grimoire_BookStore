// src/services/groqService.js
import axios from 'axios';

const GROQ_API_KEY = "";
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const getGroqResponse = async (messages) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile', // Model Groq hỗ trợ
        messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error from Groq:', error);
    return 'Xin lỗi, tôi gặp lỗi khi xử lý yêu cầu.';
  }
};
