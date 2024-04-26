'use client'

import Head from 'next/head';
import React, { useState } from 'react';

function StoryInput({ onGenerateStory }) {
  const [storyPrompt, setStoryPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (event) => {
    setStoryPrompt(event.target.value);
  };


  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerateStory(storyPrompt , imageFile);
  };

  return (
<>
<Head>
  <title>TaleWeaverSaga</title>
  <meta name="description" content="Create unique stories with AI" />
  <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" />
</Head>

<div className="container mx-auto"> {/* Optional: Added container for layout */} 
  <div className="text-center mb-12">
    <h1 className="text-5xl font-extrabold text-white tracking-wide mb-6">Welcome to TaleWeaverSaga</h1>
    <img
      src="/imgg.jpg"
      alt="TaleWeaverSaga Logo"
      width={250}
      height={250}
      className="rounded-full mx-auto shadow-2xl transform scale-105 hover:scale-110 transition-transform duration-500 h-56 w-56"
    />
  </div>

  <form onSubmit={handleSubmit} className="w-8/12 mx-auto bg-gray-100 rounded-lg shadow-xl p-10"> 
    <label htmlFor="storyPrompt" className="block text-gray-800 text-lg font-semibold mb-4">Enter the first line of your story:</label>
    <textarea
      id="storyPrompt"
      name="storyPrompt"
      rows={5}
      className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none bg-gray-50 text-black"
      value={storyPrompt}
      onChange={handleInputChange}
      required
    ></textarea>
    <input type="file" onChange={handleImageChange} />
    <button
      type="submit"
      className="w-full mt-6 py-3 text-lg text-white font-semibold rounded-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md"
    >
      Generate Story
    </button>
  </form>
</div> 
</>



  );
}

export default StoryInput;


