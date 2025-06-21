import React, { useState, useRef, useEffect } from 'react'
import { Zap, Send } from 'lucide-react'

// Cricket Ball Bouncing Animation
const CricketBallLoading = () => (
    <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-red-500 rounded-full relative animate-bounce flex items-center justify-center shadow-lg">
            <div className="w-4 h-0.5 bg-white rounded-full absolute"></div>
            <div className="w-0.5 h-4 bg-white rounded-full absolute"></div>
        </div>
        <span className="text-gray-300 text-sm animate-pulse">Analyzing cricket data...</span>
    </div>
);

// Simple Wicket Animation
const WicketLoading = () => (
    <div className="flex items-center space-x-3">
        <div className="flex space-x-1">
            <div className="w-1 h-8 bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
            <div className="w-1 h-8 bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-8 bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <span className="text-gray-300 text-sm">Processing your query...</span>
    </div>
);

const QueryAnswer = () => {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat, loading]);

    const handleInput = (e) => setInput(e.target.value);

    const handleSend = async () => {
        if (!input.trim()) return;

        const question = input.trim();
        setChat(prev => [...prev, { type: 'user', text: question }]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5001/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });
            const data = await res.json();
            setChat(prev => [...prev, { type: 'bot', text: data.answer || 'No answer found.' }]);
        } catch (e) {
            console.error('Error fetching answer:', e);
            setChat(prev => [...prev, { type: 'bot', text: 'Error fetching answer. Please try again.' }]);
        }

        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="pb-7.5 bg-black text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 p-6">
                <div className='max-w-4xl mx-auto backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl shadow-2xl min-h-[80vh] flex flex-col overflow-hidden'>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-hidden">
                        <div className="h-[60vh] overflow-y-auto px-6 py-6">
                            <div className="max-w-3xl mx-auto space-y-6">

                                {/* Welcome State */}
                                {chat.length === 0 && (
                                    <div className="text-center py-16">
                                        <div className="mb-8">
                                            <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
                                                <span className="text-4xl">🏏</span>
                                            </div>
                                        </div>
                                        <h2 className="text-3xl font-bold mb-4">
                                            <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                                                Ask me anything !
                                            </span>
                                        </h2>
                                        
                                        <div className="flex justify-center space-x-4 text-sm">
                                            <span className="px-4 py-2 bg-orange-400/20 text-orange-400 rounded-full border border-orange-400/30 backdrop-blur-sm">🏆 Teams</span>
                                            <span className="px-4 py-2 bg-blue-400/20 text-blue-400 rounded-full border border-blue-400/30 backdrop-blur-sm">⭐ Players</span>
                                            <span className="px-4 py-2 bg-green-400/20 text-green-400 rounded-full border border-green-400/30 backdrop-blur-sm">📊 Stats</span>
                                        </div>
                                    </div>
                                )}

                                {/* Messages */}
                                {chat.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex items-start space-x-3 max-w-2xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>

                                            {/* Avatar */}
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg ${msg.type === 'user'
                                                    ? 'bg-gradient-to-r from-orange-400 to-blue-400'
                                                    : 'bg-gradient-to-r from-green-400 to-emerald-400'
                                                }`}>
                                                {msg.type === 'user' ? '😊' : '🏏'}
                                            </div>

                                            {/* Message Bubble */}
                                            <div className={`px-6 py-4 rounded-2xl max-w-lg shadow-lg ${msg.type === 'user'
                                                    ? 'bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-br-md'
                                                    : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700 rounded-bl-md'
                                                }`}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Loading Animation */}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-start space-x-3 max-w-lg">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-lg shadow-lg">
                                                🏏
                                            </div>
                                            <div className="px-6 py-4 rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-bl-md shadow-lg">
                                                {Math.random() > 0.5 ? <CricketBallLoading /> : <WicketLoading />}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={chatEndRef} />
                            </div>
                        </div>
                    </div>

                    {/* Input Section */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 px-6 py-6">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-end space-x-4 bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600">
                                <textarea
                                    value={input}
                                    onChange={handleInput}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about IPL teams, players, matches, or statistics... 🏏"
                                    disabled={loading}
                                    rows={1}
                                    className="flex-1 px-3 py-3 bg-transparent resize-none focus:outline-none disabled:cursor-not-allowed placeholder-gray-400 text-white text-sm rounded-lg"
                                    style={{ minHeight: '44px', maxHeight: '120px' }}
                                />

                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueryAnswer;