import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-6 text-gray-700">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          HobiKu
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Track your favorite Games, Films, and Anime
        </p>
        
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg text-indigo-700 mb-2">Games</h2>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-indigo-600 rounded-full w-3/4"></div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg text-purple-700 mb-2">Films</h2>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-purple-600 rounded-full w-1/2"></div>
            </div>
          </div>
          
          <div className="bg-pink-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg text-pink-700 mb-2">Anime</h2>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-pink-600 rounded-full w-1/4"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300 flex items-center"
          >
            <span>Count: {count}</span>
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-sm opacity-70">
        Powered by React + Vite + Tailwind CSS
      </p>
    </div>
  )
}

export default App