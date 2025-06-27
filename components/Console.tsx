import React from 'react';

const Console = () => {
  return (
    <section className='border border-gray-300 rounded-xl  bg-gray-900 text-green-400 font-mono p-5 '>
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-sm ml-2">Terminal</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="text-yellow-300">@Roles(Roles.HR, Roles.DESPERATE_MANAGER)</div>
          <div className="text-blue-300">@POST('/hire-me-please')</div>
          <div className="text-white">
            <span className="text-purple-300">async function</span>{' '}
            <span className="text-yellow-300">hireMe</span>
            <span className="text-white">(</span>
            <span className="text-blue-300">position</span>
            <span className="text-white">: </span>
            <span className="text-green-300">BackendDeveloper</span>
            <span className="text-white">) {'{'}</span>
          </div>
          <div className="pl-4 space-y-1">
            <div className="text-gray-400">// Warning: May cause excessive productivity</div>
            <div className="text-white">
              <span className="text-purple-300">const</span>{' '}
              <span className="text-blue-300">skills</span> =
              <span className="text-white"> [</span>
              <span className="text-orange-300">'debugging at 2am'</span>
              <span className="text-white">, </span>
              <span className="text-orange-300">'turning music into code'</span>
              <span className="text-white">];</span>
            </div>
            <div className="text-white">
              <span className="text-purple-300">const</span>{' '}
              <span className="text-blue-300">enthusiasm</span> =
              <span className="text-white"> </span>
              <span className="text-purple-300">await</span>{' '}
              <span className="text-yellow-300">generateUnlimitedMotivation</span>
              <span className="text-white">();</span>
            </div>
            <div className="text-white">
              <span className="text-purple-300">const</span>{' '}
              <span className="text-blue-300">bugCount</span> =
              <span className="text-white"> </span>
              <span className="text-purple-300">await</span>{' '}
              <span className="text-yellow-300">eliminateAllBugs</span>
              <span className="text-white">(</span>
              <span className="text-orange-300">'legacy code included'</span>
              <span className="text-white">);</span>
            </div>
            <div className="mt-2 text-white">
              <span className="text-purple-300">if</span>{' '}
              <span className="text-white">(bugCount === </span>
              <span className="text-green-300">0</span>
              <span className="text-white"> && enthusiasm {'>'} </span>
              <span className="text-green-300">9000</span>
              <span className="text-white">) {'{'}</span>
            </div>
            <div className="pl-4 text-white">
              <span className="text-purple-300">return</span>{' '}
              <span className="text-white">{'{'}</span>
            </div>
            <div className="pl-8 space-y-1">
              <div className="text-blue-300">status: <span className="text-orange-300">'You found your unicorn developer!'</span>,</div>
              <div className="text-blue-300">startDate: <span className="text-purple-300">new</span> <span className="text-green-300">Date</span>(<span className="text-orange-300">'yesterday'</span>),</div>
              <div className="text-blue-300">salary: <span className="text-orange-300">'We can discuss pizza budget'</span>,</div>
              <div className="text-blue-300">workLocation: <span className="text-orange-300">'Anywhere with good WiFi'</span></div>
            </div>
            <div className="pl-4 text-white">{'};'}</div>
            <div className="text-white">{'}'}</div>
            <div className="text-red-400">
              <span className="text-purple-300">throw new</span>{' '}
              <span className="text-green-300">Error</span>
              <span className="text-white">(</span>
              <span className="text-orange-300">'Still searching for the perfect team...'</span>
              <span className="text-white">);</span>
            </div>
          </div>
          <div className="text-white">{'}'}</div>
        </div>
      </div>
    </section>
  );
};

export default Console;