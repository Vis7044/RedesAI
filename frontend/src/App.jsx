import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import YouTubeCommentAnalyzer from './YouTubeCommentAnalyzer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <YouTubeCommentAnalyzer/>
    </>
  )
}

export default App
