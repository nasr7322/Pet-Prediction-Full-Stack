import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  icon: LucideIcon;
  name: string;
  url: string;
  color: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, name, url, color }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-center w-14 h-14 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-110 text-gray-400 ${color}`}
    >
      <Icon className="w-6 h-6" />
    </a>
  );
};