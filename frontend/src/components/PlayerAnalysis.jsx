import React, { useState, useEffect } from "react";
import { User, Activity, BarChart3, AlertTriangle, Loader, TrendingUp } from "lucide-react";
import PlayerPerformanceHeatmap from "./Player_Heatmap";

const API_BASE = import.meta.env.VITE_FLASK_API_BASE || "http://localhost:5000";


const PlayerAnalysis = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedRole, setSelectedRole] = useState("batsman");
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch players (unique batters and bowlers)
  useEffect(() => {
    fetch(`${API_BASE}/players`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch players: ${res.status} ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log("Players data:", data); // For debugging
        setPlayers(data.players || []);
      })
      .catch((err) => {
        setError("Failed to load players");
        console.error("Error fetching players:", err);
      });
  }, []);

  // Fetch analysis when player and role are selected
  useEffect(() => {
    if (selectedPlayer && selectedRole) {
      setLoading(true);
      const endpoint =
        selectedRole === "batsman"
          ? `${API_BASE}/batsman/${selectedPlayer}`
          : `${API_BASE}/bowler/${selectedPlayer}`;
      fetch(endpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch analysis: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("Analysis data:", data); // For debugging
          setAnalysisData(data);
          setError(null);
        })
        .catch((err) => {
          setError(
            `Failed to load analysis for ${selectedPlayer} as ${selectedRole}`
          );
          setAnalysisData(null);
          console.error("Error fetching analysis:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setAnalysisData(null);
      setError(null);
    }
  }, [selectedPlayer, selectedRole]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent text-center mb-10 tracking-tight">
            Player Performance Analysis
          </h1>

          {/* Heatmap Section */}
          <div className="mb-8">
            <PlayerPerformanceHeatmap />
          </div>

          {/* Player and Role Selection */}
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mb-8">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Player Selection</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Select Player
                  </label>
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">-- Select a Player --</option>
                    {players.map((player) => (
                      <option key={player} value={player} className="bg-gray-700">
                        {player}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Select Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="batsman" className="bg-gray-700">Batsman</option>
                    <option value="bowler" className="bg-gray-700">Bowler</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="backdrop-blur-sm bg-red-900/50 border border-red-700 rounded-2xl p-6 shadow-2xl mb-6">
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
          )}

          {/* Loading State */}
          {loading && (
            <div className="backdrop-blur-sm bg-blue-900/50 border border-blue-700 rounded-2xl p-6 shadow-2xl mb-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                <span className="ml-3 text-blue-300">Loading analysis...</span>
              </div>
            </div>
          )}

          {/* Analysis Display */}
          {analysisData && (
            <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    {selectedRole === "batsman" ? "Batting" : "Bowling"} Analysis:{" "}
                    <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                      {analysisData[selectedRole === "batsman" ? "Batsman" : "Bowler"]}
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(analysisData).map(
                    ([key, value]) =>
                      key !== (selectedRole === "batsman" ? "Batsman" : "Bowler") && (
                        <div
                          key={key}
                          className="group p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
                            <span className="text-sm font-medium text-gray-300 capitalize">
                              {key.replace(/_/g, " ")}
                            </span>
                          </div>
                          <div className="text-xl font-semibold text-white">
                            {value}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerAnalysis;