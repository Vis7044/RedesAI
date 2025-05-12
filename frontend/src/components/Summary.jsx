import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Summary = () => {
    const [summary, setSuggestion] = useState(localStorage.getItem('summary') ? JSON.parse(localStorage.getItem('summary')) : null);  
    const [groupedComments, setGroupedComments] = useState(localStorage.getItem('groupedComments') ? JSON.parse(localStorage.getItem('groupedComments')) : {}); 
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
      Give one Summary for each category: positive, negative, and neutral.
      
      Respond in the following JSON format (strictly no extra text):
      {
        "positive": "Your summary here",
        "negative": "Your summary here",
        "neutral": "Your summary here"
      }
      
      Keep your total word count under 500. Respond with only the JSON object, nothing else.
        `;
      };
      
      
      const prompt = generatePrompt(groupedComments);

      useEffect(() => {
        const fetchSuggestion = async () => {
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL_NODE}/api/video/suggestion`, {prompt});
            const data = response.data;
            setSuggestion(data);
            console.log(data, 'data');
            localStorage.setItem('summary', JSON.stringify(data)); // Save to local storage
          } catch (error) {
            console.error('Error fetching suggestion:', error);
          }
        };
        if(!summary) {
          fetchSuggestion();
        } 
      },[])

      console.log(summary, 'summary');    
  return (

    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-white mb-6">✨ A Short Summary for What your viewer think about you!</h2>

      {summary ? (
        <div className="flex flex-col gap-6">
          {/* Positive Suggestion */}
          <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">😊</span>
              <h3 className="text-lg font-semibold text-green-800">Positive Suggestion</h3>
            </div>
            <p className="text-green-700">{summary.suggestion.positive}</p>
          </div>

          {/* Negative Suggestion */}
          <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">😞</span>
              <h3 className="text-lg font-semibold text-red-800">Negative Suggestion</h3>
            </div>
            <p className="text-red-700">{summary.suggestion.negative}</p>
          </div>

          {/* Neutral Suggestion */}
          <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">😐</span>
              <h3 className="text-lg font-semibold text-yellow-800">Neutral Suggestion</h3>
            </div>
            <p className="text-yellow-700">{summary.suggestion.neutral}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-gray-100 rounded-xl shadow-md text-center text-gray-700">
          ⏳ Loading summaries...
        </div>
      )}
    </div>
  )
}

export default Summary
