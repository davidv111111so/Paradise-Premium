// --------------------------------------------------------
// Gemini AI Client — initialized from env var
// --------------------------------------------------------
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyC7N906e5V_38m9x70q1W2-u2Z6y8_0S_8';
const genAI = new GoogleGenerativeAI(apiKey);

export function getModel(modelName = 'gemini-2.0-flash') {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Check your .env file.');
  }
  return genAI.getGenerativeModel({ model: modelName });
}

// Export a default model instance for convenience
export const geminiModel = genAI ? getModel() : null;
