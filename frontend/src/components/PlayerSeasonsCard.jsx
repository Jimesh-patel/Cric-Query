import React, { useState, useEffect } from "react";
import { Users, AlertTriangle } from "lucide-react";

const API_BASE = import.meta.env.VITE_FLASK_API_BASE || "http://localhost:5000";

const PlayerSeasonsCard = ({ selectedTeam }) => {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedTeam) {
      fetch(`${API_BASE}/team/${selectedTeam}/players`)
        .then((res) => res.json())
        .then((data) => setPlayerData(data))
        .catch((err) => {
          setError(`Failed to load data for ${selectedTeam}`);
          setPlayerData(null);
          console.error(err);
        });
    } else {
      setPlayerData(null); 
      setError(null);
    }
  }, [selectedTeam]);

  if (error) {
    return (
      <div>
        {/* Animated Background Elements */}
        <div className="fixed inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-sm bg-red-900/50 border border-red-700 rounded-2xl p-6 shadow-2xl mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-1">Error</h3>
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!playerData || !selectedTeam) {
    return (
      <div>
        {/* Animated Background Elements */}
        <div className="fixed inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Players
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mt-6">
            <div className="p-6 md:p-8">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {playerData.team} Players
                </h2>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-800/50 backdrop-blur-sm">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                        Player
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                        Seasons
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerData.players && playerData.players.length > 0 ? (
                      playerData.players.map((player, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-gray-800/50 transition-all duration-200"
                        >
                          <td className="py-3 px-4 text-sm text-white">
                            {player.player}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-300">
                            {player.seasons.join(", ")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="py-4 px-4 text-center text-sm text-gray-400 bg-gray-800/50 backdrop-blur-sm rounded-lg"
                        >
                          No players found for {selectedTeam}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSeasonsCard;