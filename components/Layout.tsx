
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>
      
      <main className="w-full max-w-6xl px-4 py-8 md:py-16 z-10 flex flex-col items-center">
        {children}
      </main>

      <footer className="mt-auto py-8 text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Hello Gemini Explorer. Built with Gemini 3 Flash.
      </footer>
    </div>
  );
};

export default Layout;
