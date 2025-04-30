import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white/30 backdrop-blur border-b border-white/20 shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out bg-transparent">
      <div className="container mx-auto px-8 py-3 flex items-center justify-between">
        {/* Left Section: Custom Logo + Title */}
        <div className="flex items-center space-x-5">
          {/* Custom Logo */}
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 p-8">
              <span className="text-2xl font-extrabold text-white tracking-wider">TBF</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-green-400/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
            </div>
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-300/15 to-green-300/15 rounded-xl opacity-20 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          {/* Title */}
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 tracking-tighter hover:scale-105 hover:drop-shadow-sm transition-all duration-300">
            Chat On
          </h1>
        </div>

 
      </div>
    </header>
  );
}