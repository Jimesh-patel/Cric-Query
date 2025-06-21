import React, { useState, useEffect } from 'react';
import { BarChart3, Activity, Loader, TrendingUp } from 'lucide-react';

const PlayerPerformanceHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState(null);
  const [statsData, setStatsData] = useState([]);
  const [selectedStat, setSelectedStat] = useState('');
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats for dropdown options
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/player-performance/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStatsData(data.stats || []);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load stats options');
      }
    };
    fetchStats();
  }, []);

  // Fetch heatmap data
  useEffect(() => {
    const fetchHeatmapData = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/player-performance/heatmap?top_n=${topN}`;
        if (selectedStat) {
          url += `&sort_by=${selectedStat}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch heatmap data');
        const data = await response.json();
        setHeatmapData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching heatmap data:', err);
        setError('Failed to load heatmap data');
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();
  }, [selectedStat, topN]);

  // Get all metrics from the stats array
  const getMetrics = () => {
    if (!heatmapData || !heatmapData.stats) return [];
    return heatmapData.stats;
  };

  // Get normalized value for display (already normalized in API response)
  const getNormalizedValue = (playerIndex, metricIndex) => {
    if (!heatmapData || !heatmapData.normalized_values) return 0;
    return heatmapData.normalized_values[playerIndex]?.[metricIndex] || 0;
  };

  // Get actual value for tooltip
  const getActualValue = (playerIndex, metricIndex) => {
    if (!heatmapData || !heatmapData.values) return 0;
    return heatmapData.values[playerIndex]?.[metricIndex] || 0;
  };

  // Get color based on normalized value
  const getColor = (normalizedValue) => {
    if (normalizedValue == null) return '#374151';

    // Dark theme color scale from dark blue to bright orange/red
    const colors = [
      '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8',
      '#cbd5e1', '#e2e8f0', '#f1f5f9', '#fef3c7', '#fcd34d',
      '#f59e0b', '#f97316', '#ea580c', '#dc2626', '#b91c1c', '#991b1b'
    ];

    const index = Math.floor(normalizedValue * (colors.length - 1));
    return colors[index];
  };

  // Format metric names for display
  const formatMetricName = (metric) => {
    return metric.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const metrics = getMetrics();

  if (loading) {
    return (
      <div className="backdrop-blur-sm bg-blue-900/50 border border-blue-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          <span className="ml-3 text-blue-300">Loading heatmap data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="backdrop-blur-sm bg-red-900/50 border border-red-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-1">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Player Performance Heatmap{' '}
            <span className="text-gray-400 text-lg">(Normalized 0-1)</span>
            {selectedStat && (
              <div className="text-sm bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mt-1">
                Sorted by {formatMetricName(selectedStat)}
              </div>
            )}
          </h2>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Sort By:</label>
            <select
              value={selectedStat}
              onChange={(e) => setSelectedStat(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            >
              <option value="" className="bg-gray-700">Overall Performance</option>
              {statsData.map((stat, index) => (
                <option key={index} value={stat} className="bg-gray-700">
                  {formatMetricName(stat)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Top Players:</label>
            <select
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
            >
              <option value={5} className="bg-gray-700">Top 5</option>
              <option value={10} className="bg-gray-700">Top 10</option>
              <option value={15} className="bg-gray-700">Top 15</option>
              <option value={20} className="bg-gray-700">Top 20</option>
            </select>
          </div>
        </div>

        {/* Heatmap */}
        {heatmapData && heatmapData.players && heatmapData.players.length > 0 ? (
          <div className="overflow-x-auto mb-6">
            <div className="inline-block min-w-full bg-gray-800/30 rounded-xl border border-gray-600 overflow-hidden">
              <table className="border-collapse w-full">
                <thead>
                  <tr className="bg-gray-800/60">
                    <th className="text-left p-3 font-medium text-gray-200 border-b border-gray-600 min-w-32">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-orange-400" />
                        Player (Top to Bottom)
                      </div>
                    </th>
                    {metrics.map((metric, index) => (
                      <th
                        key={index}
                        className="text-sm p-3 font-medium text-gray-200 border-b border-gray-600 min-w-20"
                        style={{ height: '80px' }}
                      >
                        <div className="whitespace-nowrap text-xs transform -rotate-45 origin-left">
                          {formatMetricName(metric)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.players.map((player, playerIndex) => (
                    <tr key={playerIndex} className="hover:bg-gray-700/20 transition-colors duration-200">
                      <td className="p-3 font-medium text-gray-200 border-b border-gray-700 text-sm">
                        {player}
                      </td>
                      {metrics.map((metric, metricIndex) => {
                        const normalizedValue = getNormalizedValue(playerIndex, metricIndex);
                        const actualValue = getActualValue(playerIndex, metricIndex);
                        return (
                          <td
                            key={metricIndex}
                            className="border-b border-gray-700 relative group cursor-pointer hover:ring-2 hover:ring-orange-400/50 transition-all duration-200"
                            style={{
                              backgroundColor: getColor(normalizedValue),
                              width: '40px',
                              height: '32px'
                            }}
                            title={`${player} - ${formatMetricName(metric)}: ${actualValue}`}
                          >
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-xl">
                              <div className="font-semibold text-orange-400">{player}</div>
                              <div className="text-gray-300">{formatMetricName(metric)}</div>
                              <div className="text-purple-400">Normalized: {normalizedValue.toFixed(3)}</div>
                              <div className="text-blue-400">Value: {actualValue}</div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No data available</p>
          </div>
        )}

        {/* Color Legend */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-600 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-300">Color Scale:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Low (0)</span>
              <div className="flex border border-gray-600 rounded overflow-hidden">
                {Array.from({ length: 16 }, (_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 hover:scale-110 transition-transform duration-200"
                    style={{
                      backgroundColor: getColor(i / 15)
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">High (1)</span>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default PlayerPerformanceHeatmap;