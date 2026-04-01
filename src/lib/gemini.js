// --------------------------------------------------------
// Gemini AI Client — initialized from env var
// --------------------------------------------------------
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    '[Paradise] Missing Gemini API key. Set VITE_GEMINI_API_KEY in .env'
  );
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

export function getModel(modelName = 'gemini-1.5-flash') {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Check your .env file.');
  }
  return genAI.getGenerativeModel({ 
    model: modelName,
    safetySettings: SAFETY_SETTINGS
  });
}

// Export a default model instance for convenience
export const geminiModel = genAI ? getModel() : null;
