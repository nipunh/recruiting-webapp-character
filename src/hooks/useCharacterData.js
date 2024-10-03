// useCharacterData.js
import { useState, useEffect } from 'react';

const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{nipunh}/character';

const useCharacterData = () => {
  const [characters, setCharacters] = useState([]);

  // Fetch characters from API
  const fetchCharacters = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
  
      const data = await response.json();
  
      // Check if the response contains an array in the body
      if (Array.isArray(data.body) && data.body.length > 0) {
        setCharacters(data.body); // Set characters to the array from the body
      } else {
        setCharacters([]); // Set to empty array if no characters found
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]); // Ensure characters is empty on error
    }
  };
  
  

  // Save characters to API
  const saveCharacters = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characters),
      });

      if (!response.ok) {
        throw new Error('Failed to save characters');
      }

      console.log('Characters saved successfully:', characters);
    } catch (error) {
      console.error('Error saving characters:', error);
    }
  };

  // Initialize characters on mount
  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    setCharacters,
    saveCharacters,
  };
};

export default useCharacterData;
