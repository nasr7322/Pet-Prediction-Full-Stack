import { Brain, Info, Menu, User, X, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'features', label: 'Website Features', icon: Info, path: '/features' },
    { id: 'about', label: 'About Us', icon: Zap, path: '/about' },
    ...(user ? [{ id: 'ai-model', label: 'Use AI Model', icon: Brain, path: '/ai-model' }] : []),
  ];

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate('/features');
    } else {
      navigate('/auth');
    }
    setIsMobileMenuOpen(false);
  };

  const isActiveTab = (path: string) => {
    if (path === '/features' && (location.pathname === '/' || location.pathname === '/features')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav className="relative z-50 bg-black/30 backdrop-blur-xl border-b border-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PetAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActiveTab(tab.path)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
            
            <button
              onClick={handleAuthClick}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === '/auth'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {user ? 'Logout' : 'Sign In'}
            </button>
          </div>

          {/* User Welcome Message */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Welcome, {user.name}</span>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-app">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium transition-all duration-200 ${
                      isActiveTab(tab.path)
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={handleAuthClick}
                className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/auth'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="w-5 h-5" />
                <span>{user ? 'Logout' : 'Sign In'}</span>
              </button>
              
              {user && (
                <div className="pt-4 border-t border-app">
                  <div className="px-4 py-2 text-gray-400 text-sm">
                    Logged in as {user.email}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};