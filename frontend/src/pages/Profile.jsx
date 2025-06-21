import React from 'react'
import { User, Mail, Phone, LogOut, Zap, Award } from 'lucide-react'

import { useUser } from "../context/UserContext"
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...')
        logout();
        navigate("/register")
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                </div>

                <div className="text-center relative z-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-6"></div>
                    <p className="text-gray-300 text-lg">Loading your profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="pb-3 bg-black text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                        

                        <div className="relative px-8 py-8">
                            {/* Avatar */}
                            <div className="flex justify-center mb-3">
                                <div className="w-32 h-32 bg-gray-800 rounded-full border-4 border-gray-700 shadow-2xl flex items-center justify-center relative overflow-hidden group">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.username}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-blue-400 flex items-center justify-center">
                                            <User className="w-16 h-16 text-white" />
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                            <div className='flex justify-center mb-8 text-lg text-white font-medium'>{user.username}</div>


                            {/* User Details */}
                            <div className="space-y-6">
                                {/* Email */}
                                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-400 mb-1">Email Address</p>
                                            <p className="text-lg text-white font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-400 mb-1">Phone Number</p>
                                            <p className="text-lg text-white font-medium">{user.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <div className="mt-10 flex justify-center">
                                <button
                                    onClick={handleLogout}
                                    className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 font-semibold"
                                >
                                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile