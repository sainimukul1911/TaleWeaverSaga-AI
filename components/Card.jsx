'use client'

import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';

function StoryInput({ onGenerateStory }) {
  const [storyPrompt, setStoryPrompt] = useState('');

  const handleInputChange = (event) => {
    setStoryPrompt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerateStory(storyPrompt);
  };

  return (
//     <div class="container mx-auto px-4 py-8 bg-gray-100">
//   <Head>
//     <title>TaleWeaverSaga</title>
//     <meta name="description" content="Create unique stories with AI" />
//     <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" />
//   </Head>

//   <div class="flex items-center justify-center">
//     <h1 class="text-3xl font-bold text-center mb-4 text-green-800">
//       Welcome to TaleWeaverSaga
//     </h1>
//     <img
//       src="/../public/tale.jpg"
//       alt="TaleWeaverSaga Logo"
//       width={200}
//       height={200}
//       class="rounded mx-auto"
//     />
//   </div>

  

//   <form onSubmit={handleSubmit} class="flex flex-col space-y-4 bg-gray-200 p-4 rounded-md shadow-md">
//     <label
//       for="storyPrompt"
//       class="text-base font-medium text-gray-700"
//     >
//       Enter the first line of your story:
//     </label>
//     <textarea
//       id="storyPrompt"
//       name="storyPrompt"
//       rows={5}
//       class="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 resize-none bg-white"
//       value={storyPrompt}
//       onChange={handleInputChange}
//       required
//     ></textarea>
//     <button
//       type="submit"
//       class="w-full py-2 text-center text-white font-bold rounded-md bg-green-500 hover:bg-green-700 transition-all duration-300"
//     >
//       Generate Story
//     </button>
//   </form>
// </div>

<>
  <Head>
    <title>TaleWeaverSaga</title>
    <meta name="description" content="Create unique stories with AI" />
    <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" />
  </Head>

  <div className="text-center mb-12">
    <h1 className="text-6xl font-extrabold text-white tracking-wide mb-4">Welcome to TaleWeaverSaga</h1>
    <img
      src="/imgg.jpg"
      alt="TaleWeaverSaga Logo"
      width={250}
      height={250}
      className="rounded-full mx-auto shadow-2xl transform scale-105 hover:scale-110 transition-transform duration-500 h-56 w-56"
    />
  </div>

  <form onSubmit={handleSubmit} className=" w-8/12 mx-auto bg-white rounded-lg shadow-md p-8">
    <label htmlFor="storyPrompt" className="block text-gray-800 text-lg font-semibold mb-4">Enter the first line of your story:</label>
    <textarea
      id="storyPrompt"
      name="storyPrompt"
      rows={5}
      className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none bg-gray-100"
      value={storyPrompt}
      onChange={handleInputChange}
      required
    ></textarea>
    <button
      type="submit"
      className="w-full mt-6 py-3 text-lg text-white font-semibold rounded-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md"
    >
      Generate Story
    </button>
  </form>
</>


  );
}

export default StoryInput;


