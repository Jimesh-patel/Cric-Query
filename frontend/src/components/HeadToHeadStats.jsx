import React from "react";
import { Trophy, Target, MapPin } from "lucide-react";

export default function HeadToHeadStats({ data }) {
  if (!data) return null;
  const { teams, basic_stats, venue_performance } = data;
  const [team1, team2] = teams.split(" vs ");

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
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                  {teams}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <span className="block text-sm font-semibold text-gray-400 capitalize mb-2">
                    Total Matches:
                  </span>
                  <span className="block text-lg font-medium text-white">
                    {basic_stats.total_matches}
                  </span>
                </div>
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <span className="block text-sm font-semibold text-gray-400 capitalize mb-2">
                    {team1} Wins:
                  </span>
                  <span className="block text-lg font-medium text-white">
                    {basic_stats.team1_wins} ({basic_stats.team1_win_pct}%)
                  </span>
                </div>
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <span className="block text-sm font-semibold text-gray-400 capitalize mb-2">
                    {team2} Wins:
                  </span>
                  <span className="block text-lg font-medium text-white">
                    {basic_stats.team2_wins} ({basic_stats.team2_win_pct}%)
                  </span>
                </div>
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <span className="block text-sm font-semibold text-gray-400 capitalize mb-2">
                    No Results:
                  </span>
                  <span className="block text-lg font-medium text-white">
                    {basic_stats.no_results}
                  </span>
                </div>
                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <span className="block text-sm font-semibold text-gray-400 capitalize mb-2">
                    Leader:
                  </span>
                  <span className="block text-lg font-medium text-white">
                    {basic_stats.head_to_head_leader}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Venue Performance</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {venue_performance &&
                  Object.entries(venue_performance).map(([venue, stats]) => (
                    <div
                      key={venue}
                      className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="font-bold text-white text-base mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        {venue}
                      </div>
                      <div className="text-sm text-gray-300 mb-1">
                        {team1}: {stats.team1_wins} wins ({stats.team1_win_pct}%)
                      </div>
                      <div className="text-sm text-gray-300 mb-1">
                        {team2}: {stats.team2_wins} wins ({stats.team2_win_pct}%)
                      </div>
                      <div className="text-sm text-gray-300">
                        Leader: <span className="text-orange-400 font-medium">{stats.venue_leader}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}