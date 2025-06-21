import React from "react";

export default function SeasonSelector({ seasons, selected, onChange }) {
  return (
    <div>
      <div className="relative z-10 mb-3">
        <select
          id="season-select"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" className="bg-gray-800 text-gray-300">Select Season</option>
          {seasons.map((season) => (
            <option key={season} value={season} className="bg-gray-800 text-white">
              {season}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}