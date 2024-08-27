'use client'

function TextToSpeech({Text}) {

      const handleSpeech = () => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(Text);
          window.speechSynthesis.speak(utterance);
        } else {
          alert('Sorry, your browser does not support text-to-speech.');
        }
      };

    return(
        <div>
            <button onClick={handleSpeech}>Voice Speach</button>
        </div>
    );
}

export default TextToSpeech
