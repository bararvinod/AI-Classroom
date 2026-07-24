import React, { useState, useRef, useEffect } from 'react';
import SlideViewer from './SlideViewer';
import QuizInterface from './QuizInterface';
import Whiteboard from './Whiteboard';

interface ClassmateMessage {
  name: string;
  message: string;
  personality: string;
}

const ClassroomInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'quiz' | 'whiteboard' | 'discussion'>('slides');
  const [topic, setTopic] = useState('Smart Home Systems');
  const [classmateMessages, setClassmateMessages] = useState<ClassmateMessage[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [classmateMessages]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);
    try {
      // This would call the backend to get AI responses
      const response = await fetch('http://localhost:3001/api/classroom/discuss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, topic }),
      });
      // Handle response
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
      setUserMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content Area */}
      <div className="lg:col-span-2">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg shadow-md p-2">
          {(['slides', 'quiz', 'whiteboard', 'discussion'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6 min-h-96">
          {activeTab === 'slides' && <SlideViewer topic={topic} />}
          {activeTab === 'quiz' && <QuizInterface topic={topic} />}
          {activeTab === 'whiteboard' && <Whiteboard />}
          {activeTab === 'discussion' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Classroom Discussion</h2>
              <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                {classmateMessages.map((msg, idx) => (
                  <div key={idx} className="mb-4 pb-4 border-b">
                    <p className="font-semibold text-indigo-600">{msg.name}</p>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - AI Classmates */}
      <div className="bg-white rounded-lg shadow-md p-6 h-fit">
        <h2 className="text-xl font-bold text-gray-800 mb-4">AI Classmates</h2>
        <div className="space-y-4">
          {['Alex', 'Jordan', 'Sam', 'Casey'].map((name) => (
            <div key={name} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white text-sm font-bold">
                {name[0]}
              </div>
              <span className="text-sm font-medium text-gray-700">{name}</span>
              <div className="w-2 h-2 rounded-full bg-green-500 ml-auto"></div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ask a Question:</label>
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your question here..."
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomInterface;
