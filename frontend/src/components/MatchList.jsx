import React from "react";
import { Calendar, Users, Trophy, MapPin, Coins, Target, AlertCircle } from "lucide-react";

export default function MatchList({ matches }) {
  if (!matches || matches.length === 0) {
    return (
      <div>
        <div className="relative z-10 mt-4">
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-gray-400">No matches found.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div >

      <div className="relative z-10 mt-4">
        <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800/70 border-b border-gray-600">
                  <th className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-semibold text-white">Date</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-white">Teams</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-white">Winner</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-semibold text-white">Venue</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-semibold text-white">Toss</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-semibold text-white">Target Runs</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, index) => (
                  <tr
                    key={match.match_id}
                    className={`border-b border-gray-700/50 hover:bg-gray-800/30 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-900/20'
                      }`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-300">{match.date}</td>
                    <td className="py-3 px-4 text-sm text-white font-medium">
                      {match.team1} <span className="text-gray-400">vs</span> {match.team2}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-green-400 font-medium">{match.winner}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">{match.venue}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      <span className="text-orange-400 font-medium">{match.toss_winner}</span>
                      <span className="text-gray-500"> ({match.toss_decision})</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-red-400 font-medium">{match.target_runs}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}