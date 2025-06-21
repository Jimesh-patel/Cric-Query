import React from "react";

export default function TeamSelector({ teams, selected, onChange, label = "Team" }) {
  return (
    <div className="mb-6">
  
      <div className="relative group">
        <select
          className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer hover:border-orange-400/50 hover:bg-gray-700/70"
          value={selected}
          onChange={e => onChange(e.target.value)}
        >
          <option value="" className="bg-gray-800 text-gray-400">
            Select {label}
          </option>
          {teams.map(team => (
            <option key={team} value={team} className="bg-gray-800 text-white hover:bg-gray-700">
              {team}
            </option>
          ))}
        </select>
      </div>

      
    </div>
  );
}