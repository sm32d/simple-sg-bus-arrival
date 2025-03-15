'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchInputProps {
  onSearch: (stopNumber: string) => void;
}

const MAX_RECENT_SEARCHES = 5;

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [input, setInput] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('recentBusStops');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveSearch = (stopNumber: string) => {
    const updatedSearches = [stopNumber, ...recentSearches.filter(s => s !== stopNumber)]
      .slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentBusStops', JSON.stringify(updatedSearches));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onSearch(trimmedInput);
      saveSearch(trimmedInput);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (stopNumber: string) => {
    setInput(stopNumber);
    onSearch(stopNumber);
    setShowSuggestions(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Enter bus stop number"
          className="flex-1 px-4 py-3 text-gray-950 placeholder-gray-600 text-base border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Check
        </button>
      </form>
      {showSuggestions && recentSearches.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {recentSearches.map((stopNumber) => (
              <li
                key={stopNumber}
                onClick={() => handleSuggestionClick(stopNumber)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              >
                Bus Stop: {stopNumber}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}