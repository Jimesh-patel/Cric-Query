import React, { useState, useEffect, use } from "react";
import { Trophy, Users, Calendar, Activity, TrendingUp } from "lucide-react";
import TeamSelector from "../components/TeamSelector";
import SeasonSelector from "../components/SeasonSelector";
import PerformanceCard from "../components/PerformacneCard";
import HeadToHeadStats from "../components/HeadToHeadStats";
import MatchList from "../components/MatchList";
import PlayerSeasonsCard from "../components/PlayerSeasonsCard";

// import from .env file
const API_BASE = import.meta.env.VITE_FLASK_API_BASE || "http://localhost:5000";

export default function Home() {
  const [analysisType, setAnalysisType] = useState("team");
  const [teams, setTeams] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeam2, setSelectedTeam2] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [performance, setPerformance] = useState(null);
  const [headToHead, setHeadToHead] = useState(null);
  const [matches, setMatches] = useState([]);
  const [SeasonWiseTeamSummary, setSeasonWiseTeamSummary] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(data.teams));
    fetch(`${API_BASE}/seasons`)
      .then((res) => res.json())
      .then((data) => setSeasons(data.seasons));
  }, []);

  useEffect(() => {
    if (analysisType === "team" && selectedTeam) {
      fetch(`${API_BASE}/team/${selectedTeam}/performance`)
        .then((res) => res.json())
        .then(setPerformance);

      fetch(`${API_BASE}/team/${selectedTeam}/season-summary`)
        .then((res) => res.json())
        .then(setSeasonWiseTeamSummary);
    }
  }, [analysisType, selectedTeam]);

  useEffect(() => {
    if (
      analysisType === "head" &&
      selectedTeam &&
      selectedTeam2 &&
      selectedTeam !== selectedTeam2
    ) {
      fetch(`${API_BASE}/head-to-head/${selectedTeam}/${selectedTeam2}`)
        .then((res) => res.json())
        .then(setHeadToHead);
    }
  }, [analysisType, selectedTeam, selectedTeam2]);

  useEffect(() => {
    if (analysisType === "season" && selectedSeason) {
      fetch(`${API_BASE}/season/${selectedSeason}/matches`)
        .then((res) => res.json())
        .then((data) => setMatches(data.matches || []));
    }
  }, [analysisType, selectedSeason]);

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
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-4 tracking-tight">
              IPL Cricket Analysis Workshop
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto rounded-full"></div>
          </div>

          {/* Analysis Type Selection */}
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mb-8">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Analysis Type</h3>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <label className="group cursor-pointer">
                  <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${analysisType === "team"
                      ? "border-purple-400 bg-purple-400/10"
                      : "border-gray-600 bg-gray-800/30 hover:border-purple-400/50 hover:bg-purple-400/5"
                    }`}>
                    <input
                      type="radio"
                      value="team"
                      checked={analysisType === "team"}
                      onChange={() => setAnalysisType("team")}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${analysisType === "team"
                        ? "border-purple-400 bg-purple-400"
                        : "border-gray-500"
                      }`}>
                      {analysisType === "team" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <Trophy className={`w-5 h-5 transition-colors duration-300 ${analysisType === "team" ? "text-purple-400" : "text-gray-400"
                      }`} />
                    <span className={`font-medium transition-colors duration-300 ${analysisType === "team" ? "text-purple-400" : "text-gray-300"
                      }`}>
                      Team Performance
                    </span>
                  </div>
                </label>

                <label className="group cursor-pointer">
                  <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${analysisType === "head"
                      ? "border-orange-400 bg-orange-400/10"
                      : "border-gray-600 bg-gray-800/30 hover:border-orange-400/50 hover:bg-orange-400/5"
                    }`}>
                    <input
                      type="radio"
                      value="head"
                      checked={analysisType === "head"}
                      onChange={() => setAnalysisType("head")}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${analysisType === "head"
                        ? "border-orange-400 bg-orange-400"
                        : "border-gray-500"
                      }`}>
                      {analysisType === "head" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <Users className={`w-5 h-5 transition-colors duration-300 ${analysisType === "head" ? "text-orange-400" : "text-gray-400"
                      }`} />
                    <span className={`font-medium transition-colors duration-300 ${analysisType === "head" ? "text-orange-400" : "text-gray-300"
                      }`}>
                      Head-to-Head
                    </span>
                  </div>
                </label>

                <label className="group cursor-pointer">
                  <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${analysisType === "season"
                      ? "border-blue-400 bg-blue-400/10"
                      : "border-gray-600 bg-gray-800/30 hover:border-blue-400/50 hover:bg-blue-400/5"
                    }`}>
                    <input
                      type="radio"
                      value="season"
                      checked={analysisType === "season"}
                      onChange={() => setAnalysisType("season")}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${analysisType === "season"
                        ? "border-blue-400 bg-blue-400"
                        : "border-gray-500"
                      }`}>
                      {analysisType === "season" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <Calendar className={`w-5 h-5 transition-colors duration-300 ${analysisType === "season" ? "text-blue-400" : "text-gray-400"
                      }`} />
                    <span className={`font-medium transition-colors duration-300 ${analysisType === "season" ? "text-blue-400" : "text-gray-300"
                      }`}>
                      Season Matches
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Team Performance Section */}
          {analysisType === "team" && (
            <div className="space-y-8">
              <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Team Selection</h3>
                  </div>
                  <TeamSelector
                    teams={teams}
                    selected={selectedTeam}
                    onChange={setSelectedTeam}
                  />
                </div>
              </div>
              {performance && <PerformanceCard data={performance} seasonSummary={SeasonWiseTeamSummary} />}
              {selectedTeam && <PlayerSeasonsCard selectedTeam={selectedTeam} />}
            </div>
          )}

          {/* Head-to-Head Section */}
          {analysisType === "head" && (
            <div className="space-y-8">
              <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Team Comparison</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-300">Team 1</label>
                      <TeamSelector
                        teams={teams}
                        selected={selectedTeam}
                        onChange={setSelectedTeam}
                        label="Team 1"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-300">Team 2</label>
                      <TeamSelector
                        teams={teams}
                        selected={selectedTeam2}
                        onChange={setSelectedTeam2}
                        label="Team 2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {headToHead && <HeadToHeadStats data={headToHead} />}
            </div>
          )}

          {/* Season Matches Section */}
          {analysisType === "season" && (
            <div className="space-y-8">
              <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Season Selection</h3>
                  </div>
                  <SeasonSelector
                    seasons={seasons}
                    selected={selectedSeason}
                    onChange={setSelectedSeason}
                  />
                </div>
              </div>
              <MatchList matches={matches} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}