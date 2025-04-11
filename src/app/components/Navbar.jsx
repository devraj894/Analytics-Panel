import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 bg-white shadow-md flex items-center justify-between text-black border-b border-gray-200 flex-wrap">
      
      {/* Logo Section */}
      <div className="flex items-center min-w-0">
        <Image 
          src="/logo.avif" 
          alt="Logo"
          width={40}
          height={40}
          className="rounded"
        />
        <span className="ml-2 text-lg sm:text-xl font-bold truncate">WhatBytes</span>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-xl mt-2 sm:mt-0">
        <Image 
          src="/user.avif" 
          alt="User"
          width={36}
          height={36}
          className="rounded-full"
        />
        <span className="text-sm sm:text-base font-bold truncate">Ashwin Kumar</span>
      </div>
    </nav>
  );
}
