'use client';

import { useState, useEffect } from 'react';

interface FavoriteStop {
  code: string;
  name: string;
}

interface FavoriteStopsProps {
  onSelectStop: (stopNumber: string) => void;
}

export default function FavoriteStops({ onSelectStop }: FavoriteStopsProps) {
  const [favorites, setFavorites] = useState<FavoriteStop[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStopCode, setNewStopCode] = useState('');
  const [newStopName, setNewStopName] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteBusStops');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const saveFavorites = (updatedFavorites: FavoriteStop[]) => {
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteBusStops', JSON.stringify(updatedFavorites));
  };

  const handleAddFavorite = () => {
    if (!newStopCode || !newStopName) return;

    const newFavorite = {
      code: newStopCode.trim(),
      name: newStopName.trim()
    };

    if (editIndex !== null) {
      const updated = [...favorites];
      updated[editIndex] = newFavorite;
      saveFavorites(updated);
    } else {
      saveFavorites([...favorites, newFavorite]);
    }

    setNewStopCode('');
    setNewStopName('');
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const handleEdit = (index: number) => {
    const favorite = favorites[index];
    setNewStopCode(favorite.code);
    setNewStopName(favorite.name);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const updated = favorites.filter((_, i) => i !== index);
    saveFavorites(updated);
  };

  return (
    <div className="mt-4">
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Favorite Stops</h2>
          <button
            onClick={() => {
              setNewStopCode('');
              setNewStopName('');
              setEditIndex(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          >
            + Add Favorite
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite, index) => (
            <div
              key={index}
              className="group p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              <div className="flex justify-between items-start relative">
                <button
                  onClick={() => onSelectStop(favorite.code)}
                  className="flex-1 text-left group-hover:transform group-hover:translate-x-1 transition-transform duration-200"
                >
                  <div className="font-semibold text-gray-900 text-lg mb-1">{favorite.name}</div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                    Stop: {favorite.code}
                  </div>
                </button>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {favorites.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-3">No favorite stops added yet</div>
            <div className="text-sm">Add your frequently used bus stops for quick access</div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {editIndex !== null ? 'Edit Favorite Stop' : 'Add Favorite Stop'}
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bus Stop Code
                </label>
                <input
                  type="text"
                  value={newStopCode}
                  onChange={(e) => setNewStopCode(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900"
                  placeholder="Enter bus stop code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Name
                </label>
                <input
                  type="text"
                  value={newStopName}
                  onChange={(e) => setNewStopName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900"
                  placeholder="Enter a memorable name"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-100 hover:bg-red-500 hover:scale-105 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFavorite}
                  className="px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {editIndex !== null ? 'Save Changes' : 'Add Favorite'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}