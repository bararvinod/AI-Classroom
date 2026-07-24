import React, { useState, useEffect } from 'react';
import ClassroomInterface from './components/ClassroomInterface';
import './App.css';

function App() {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize classroom
    initializeClassroom();
  }, []);

  const initializeClassroom = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/health');
      const data = await response.json();
      console.log('Backend health:', data);
      setClassroom({ connected: true });
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-600">AI Classroom</h1>
          <p className="text-gray-600 mt-1">Grade 8 NCERT - Home Automation</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-xl text-gray-600">Initializing classroom...</div>
          </div>
        ) : classroom?.connected ? (
          <ClassroomInterface />
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Unable to connect to backend. Please ensure the server is running.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
