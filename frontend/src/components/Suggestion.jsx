import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Suggestion = ({groupedComments}) => {
    const [suggestion, setSuggestion] = useState(null);   
    const generatePrompt = (comments) => {
        return `
      YouTube Comment Sentiment Breakdown:
      
      Positive:
      ${comments.positive.map(c => `- ${c}`).join("\n")}
      
      Negative:
      ${comments.negative.map(c => `- ${c}`).join("\n")}
      
      Neutral:
      ${comments.neutral.map(c => `- ${c}`).join("\n")}
      
      Your task:
      Give one helpful suggestion for each category: positive, negative, and neutral.
      
      Respond in the following JSON format (strictly no extra text):
      {
        "positive": "Your suggestion here",
        "negative": "Your suggestion here",
        "neutral": "Your suggestion here"
      }
      
      Keep your total word count under 200. Respond with only the JSON object, nothing else.
        `;
      };
      
      
      const prompt = generatePrompt(groupedComments);

      useEffect(() => {
        const fetchSuggestion = async () => {
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL_NODE}/api/video/suggestion`, {prompt});
            const data = response.data;
            setSuggestion(data);
          } catch (error) {
            console.error('Error fetching suggestion:', error);
          }
        };
        fetchSuggestion();
      },[])

      console.log(suggestion, 'suggestion');    
  return (

    <div>
      {suggestion && (
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-lg font-bold">Suggestions</h2>
          <div className="flex flex-col gap-2">
            <div className="bg-green-100 text-green-700 p-4 rounded-md">
              <strong>Positive:</strong> {suggestion.suggestion.positive}
            </div>
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              <strong>Negative:</strong> {suggestion.suggestion.negative}
            </div>
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
              <strong>Neutral:</strong> {suggestion.suggestion.neutral}
            </div>
          </div>
        </div>
      )}
      {!suggestion && (
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-lg font-bold">Suggestions</h2>
          <div className="bg-gray-100 text-gray-700 p-4 rounded-md">
            Loading suggestions...
          </div>
        </div>
      )}
    </div>
  )
}

export default Suggestion
