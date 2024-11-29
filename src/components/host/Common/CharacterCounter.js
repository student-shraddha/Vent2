import React, { useState } from 'react';

const CharacterCounter = () => {
  const [text, setText] = useState('');
  const maxWords = 700;

  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxWords) {
      setText(inputText);
    }
  };

  return (
    <div className="w-full p-1 mt-4">
      <textarea
        className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none"
        placeholder="Enter text..."
        value={text}
        onChange={handleChange}
      ></textarea>
      <p className="text-sm text-gray-500">{text.length}/{maxWords} words</p>
    </div>
  );
};

export default CharacterCounter;
