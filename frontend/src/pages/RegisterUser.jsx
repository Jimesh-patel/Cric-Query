import React, { useState } from 'react';
import { Mail, User, Phone, Lock, Zap, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useUser } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {

    const { login } = useUser();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: '',
        username: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const endpoint = isLogin
            ? `${url}/auth/login`
            : `${url}/auth/create-user`;

        const payload = isLogin
            ? { email: form.email, password: form.password }
            : {
                username: form.username,
                email: form.email,
                phone: form.phone,
                password: form.password
            };

        console.log('Submitting:', payload);

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            let data;
            try {
                data = await res.json();
            } catch {
                data = {};
            }

            console.log('Response:', res, data);

            if (res.ok && data.token) {
                login(data.token);
                navigate("/Query");
            } else if (data && data.message) {
                setError(data.message);
            } else if (!res.ok) {
                setError(`Error: ${res.status} - ${res.statusText}`);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Network error. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">

                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-700 bg-gray-800/30">
                        <div className="flex">
                            <button
                                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all duration-300 ${isLogin
                                        ? 'text-orange-400 border-b-2 border-orange-400 bg-orange-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                                    }`}
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                            <button
                                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all duration-300 ${!isLogin
                                        ? 'text-orange-400 border-b-2 border-orange-400 bg-orange-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                                    }`}
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="max-w-md mx-auto">
                        {/* Form Section */}
                        <div className="p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-2 text-white">
                                    {isLogin ? 'Login to Your Account' : 'Create Your Account'}
                                </h2>
                                <p className="text-gray-400">
                                    {isLogin
                                        ? 'Access your cricket analytics dashboard'
                                        : 'Start your journey with advanced cricket insights'
                                    }
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Email Field */}
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                {/* Username Field (Sign Up Only) */}
                                {!isLogin && (
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Choose a username"
                                            value={form.username}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                )}

                                {/* Phone Field (Sign Up Only) */}
                                {!isLogin && (
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                )}

                                {/* Password Field */}
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="group w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                                >
                                    <span>{isLogin ? 'Login' : 'Create Account'}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                                        <p className="text-red-400 text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                {/* Forgot Password Link (Login Only) */}
                                {isLogin && (
                                    <div className="text-center">
                                        <a href="#" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                                            Forgot your password?
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterUser;