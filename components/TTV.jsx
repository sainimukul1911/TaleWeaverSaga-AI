'use client'

import React from 'react';
import { MdMic } from 'react-icons/md'; // Import a different mic icon

function TextToSpeech({ Text }) {
  const handleSpeech = async () => {
    try {
      const response = await fetch('https://voicerss-text-to-speech.p.rapidapi.com/', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY, 
          'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
        },
        body: new URLSearchParams({
          key: process.env.NEXT_PUBLIC_VOICERSS_API_KEY,  
          src: Text,
          hl: 'en-us',
          v: 'Mary',
          r: '0',
          c: 'mp3',
          f: '44khz_16bit_stereo'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from API:', errorText);
        alert('Failed to synthesize speech. Error: ' + errorText);
        return;
      }

      const audioUrl = URL.createObjectURL(await response.blob());
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSpeech} className="flex items-center p-2 bg-blue-500 text-white rounded">
        <MdMic className="mr-2" /> Voice Speech
      </button>
    </div>
  );
}

export default TextToSpeech;
