import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    {...props}
  >
    <path d="M168,48a80,80,0,0,0-80,80,16,16,0,0,0,32,0,48,48,0,0,1,48-48,16,16,0,0,0,0-32Z"/>
    <path d="M88,208a80,80,0,0,0,80-80,16,16,0,0,0-32,0,48,48,0,0,1-48,48,16,16,0,0,0,0,32Z"/>
  </svg>
);


const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.06zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM5.106 17.894a.75.75 0 010-1.06l1.59-1.59a.75.75 0 111.061 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 5.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.061L5.106 6.167a.75.75 0 010-1.06z" />
    </svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.833 2.067-7.17 5.168-9.012a.75.75 0 01.662.17z" clipRule="evenodd" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <header className="bg-white dark:bg-brand-secondary shadow-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-3">
             <LogoIcon className="h-10 w-10 text-brand-primary" />
             <span className="text-xl md:text-2xl font-black text-gray-900 dark:text-brand-light tracking-wider whitespace-nowrap">Sujay Movie Review & Rating</span>
           </div>
        </div>
        <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-xs sm:max-w-sm">
              <div className="relative">
                <input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Search for a movie..."
                  className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 border-2 border-gray-300 dark:border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-3"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </form>
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="w-6 h-6 text-brand-primary" /> : <MoonIcon className="w-6 h-6 text-gray-800" />}
            </button>
        </div>
      </div>
    </header>
  );
};