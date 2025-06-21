import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Users, Star, ArrowRight, Play, Award, Zap, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Base = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/Rgister");
  }

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Deep dive into player statistics, team performance, and match dynamics with our AI-powered analysis engine."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-time Predictions",
      description: "Get live match predictions with constantly updated probabilities based on current game state."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accurate Forecasting",
      description: "98% accuracy rate in match predictions using machine learning and historical data analysis."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Insights",
      description: "Access professional cricket analyst opinions and community-driven predictions and discussions."
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex items-center justify-between backdrop-blur-sm bg-gray-900/50 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Cric-Query
          </h1>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-blue-600 px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => handleSubmit()}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
              Predict the
            </span>
            <br />
            <span className="text-white">Unpredictable</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered IPL analytics and predictions. Get real-time insights, match forecasts, and player statistics with industry-leading accuracy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="group bg-gradient-to-r from-orange-500 to-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span onClick={() => handleSubmit()}>Start Predicting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              Why Choose Cric-Query?
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cutting-edge technology meets cricket passion to deliver unmatched insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">{feature.title}</h4>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h3 className="text-4xl font-bold mb-4 text-white">Ready to Dominate IPL Predictions?</h3>
          <button className="bg-gradient-to-r from-orange-500 to-blue-600 px-12 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <span onClick={() => handleSubmit()}>Let's try</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                Cric-Query
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2025 Cric-Query. All rights reserved. Predict responsibly.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;