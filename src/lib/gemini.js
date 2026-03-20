// --------------------------------------------------------
// Gemini AI Client — initialized from env var
// --------------------------------------------------------
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    '[Paradise] Missing Gemini API key. Set VITE_GEMINI_API_KEY in .env'
  );
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export function getModel(modelName = 'gemini-2.0-flash') {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Check your .env file.');
  }
  return genAI.getGenerativeModel({ model: modelName });
}

// Export a default model instance for convenience
export const geminiModel = genAI ? getModel() : null;
