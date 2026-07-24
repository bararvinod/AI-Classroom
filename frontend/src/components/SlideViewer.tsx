import React, { useState, useEffect } from 'react';

interface Slide {
  id: string;
  title: string;
  content: string;
  visualDescription: string;
  animations: string[];
}

interface SlideViewerProps {
  topic: string;
}

const SlideViewer: React.FC<SlideViewerProps> = ({ topic }) => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSlides();
  }, [topic]);

  const loadSlides = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/content/slides?topic=${encodeURIComponent(topic)}`);
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error('Error loading slides:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading slides...</div>;
  }

  if (!slides.length) {
    return <div className="text-center py-8 text-gray-600">No slides available</div>;
  }

  const slide = slides[currentSlide];

  return (
    <div className="space-y-6">
      {/* Current Slide */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-8 min-h-96">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">{slide.title}</h1>
        <div className="prose prose-lg text-gray-700">
          {slide.content}
        </div>
        {slide.visualDescription && (
          <div className="mt-6 p-4 bg-white rounded-lg border-2 border-indigo-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Visual:</span> {slide.visualDescription}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          ← Previous
        </button>
        <span className="text-gray-600">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button
          onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
          disabled={currentSlide === slides.length - 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Slide Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`flex-shrink-0 w-20 h-16 rounded-lg border-2 transition-all ${
              idx === currentSlide
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-300 bg-white hover:border-indigo-400'
            }`}
          >
            <div className="text-xs font-semibold text-gray-700 p-1 text-center h-full flex items-center justify-center">
              {idx + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlideViewer;
