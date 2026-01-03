
import { GoogleGenAI, Type } from "@google/genai";
import { GreetingVariant } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getGeminiGreeting = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly concierge. Your primary goal is to say 'Hello' or greet the user in an engaging, warm, and sophisticated manner based on their prompt.",
        temperature: 0.8,
      }
    });
    return response.text || "Hello! I'm here to help, but I couldn't find the right words just now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const getMultilingualGreetings = async (): Promise<GreetingVariant[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 6 unique ways to say 'Hello' in different languages with pronunciation and context.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              language: { type: Type.STRING },
              text: { type: Type.STRING },
              pronunciation: { type: Type.STRING },
              context: { type: Type.STRING }
            },
            required: ["language", "text", "pronunciation", "context"]
          }
        }
      }
    });
    
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Multilingual Error:", error);
    return [];
  }
};
