import React from 'react';

const Terminal = () => {
  return (
    <section className='border border-gray-300 rounded-xl  bg-gray-900 text-green-400 font-mono p-5 w-full'>
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-sm ml-2">Terminal</span>
        </div>
      
      </div>
    </section>
  );
};

export default Terminal;