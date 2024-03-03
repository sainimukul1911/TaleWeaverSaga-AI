'use client'

import React, { useState } from 'react';
import StoryInput from '../components/Card';
import GeneratedStory from '../components/AIUI';
import { GoogleGenerativeAI } from '@google/generative-ai';

function HomePage() {
  const [generatedStory, setGeneratedStory] = useState('');

  const apiKey = process.env.GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const generateStory = async (storyPrompt) => {

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
  });


  const result = await chat.sendMessage(storyPrompt);

  // const result = await model.generateContent(storyPrompt);
  const response = result.response;
  const text = response.text();

    setGeneratedStory(text);
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 min-h-screen flex flex-col justify-center items-center py-8">
      <StoryInput onGenerateStory={generateStory} />
      {generatedStory && <GeneratedStory story={generatedStory} />}
    </div>
    );
  }

  export default HomePage;
