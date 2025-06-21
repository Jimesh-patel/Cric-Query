import React from "react";
import { Trophy, Calendar, BarChart3, TrendingUp, Target, Users, Zap, Award } from "lucide-react";

export default function PerformanceCard({ data, seasonSummary }) {
  console.log("data:", seasonSummary);

  const summaryArr = seasonSummary?.season_summaries
    ? Object.values(seasonSummary.season_summaries)
    : [];

  const champions = summaryArr.filter((s) => s.champion === true).length || 0;
  const runnerUps = summaryArr.filter((s) => s.runner_up === true).length || 0;

  return (
    <div>
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mt-6">
            <div className="p-6 md:p-8">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {data.team} Performance
                </h2>
              </div>

              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Seasons */}
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      Total Seasons:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {data.total_seasons}
                  </span>
                </div>

                {/* Total Matches */}
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      Total Matches:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {data.total_matches}
                  </span>
                </div>

                {/* Wins */}
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      Wins:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {data.wins}
                  </span>
                </div>

                {/* Losses */}
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-red-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      Losses:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {data.losses}
                  </span>
                </div>

                {/* No Result */}
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      No Result:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {data.no_result}
                  </span>
                </div>

                {/* Win Ratio */}
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      Win Ratio:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {data.win_ratio}%
                  </span>
                </div>

                {/* Championships */}
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      Championships 🏆:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {champions}
                  </span>
                </div>

                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="block text-sm font-semibold text-gray-300">
                      Runner-up 🥈:
                    </span>
                  </div>
                  <span className="block text-lg font-medium text-white">
                    {runnerUps}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}