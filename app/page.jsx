'use client'

import React, { useState } from 'react';
import StoryInput from '../components/Card';
import GeneratedStory from '../components/AIUI';
import { GoogleGenerativeAI } from '@google/generative-ai';
import TextToSpeech from '../components/TTV';
import { FaMicrophone } from 'react-icons/fa'; // Import mic icon

function HomePage() {
  const [generatedStory, setGeneratedStory] = useState('');
  const [isListening, setIsListening] = useState(false); // State to manage listening status

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const genAI = new GoogleGenerativeAI(apiKey);

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const generateStory = async (storyPrompt, imageFile) => {
    let result;
    let response;

    if (imageFile) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Based on the Image I have provided , make a story, any additional detail I will provide now - ${storyPrompt}`;

      const base64Image = await fileToGenerativePart(imageFile);
      const chat = model.startChat({
        generationConfig: {
          maxOutputTokens: 1000,
        },
        safetySetting: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE'
          },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE'
          }
        ],
      });

      result = await chat.sendMessage([prompt, base64Image]);
      response = result.response;

    } else {

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: "You have to act as a storyteller. I will give you a line and based on that you will generate me a story.",
          },
          {
            role: "model",
            parts: "Understood! I will now generate stories based on your input",
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
        },
        safetySetting: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE'
          },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE'
          }
        ],
      });

      result = await chat.sendMessage(storyPrompt);
      response = result.response;
    }

    const text = response.text();

    setGeneratedStory(text);
  };

  const handleVoiceInput = async () => {
    setIsListening(true);
    // Implement voice input functionality here
    // For example, using Web Speech API
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = async (event) => {
      const voiceInput = event.results[0][0].transcript;
      setIsListening(false);
      await generateStory(voiceInput);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 min-h-screen flex flex-col justify-center items-center py-8">
      <StoryInput onGenerateStory={generateStory} />
      <button onClick={handleVoiceInput} className="mt-4 p-2 bg-white rounded-full">
        <FaMicrophone className={`text-2xl ${isListening ? 'text-red-500' : 'text-black'}`} />
      </button>
      {generatedStory && <GeneratedStory story={generatedStory}z />}
      {generatedStory && <TextToSpeech Text={generatedStory} />}
    </div>
  );
}

export default HomePage;
