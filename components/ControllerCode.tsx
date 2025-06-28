import React from 'react';

const ControllerCode = () => {
  return (
    <div className="space-y-0.5 text-sm leading-5 font-mono">
      <div>
        <span className="text-gray-500">// NestJS Controller for hire requests</span>
      </div>

      <div>
        <span className="text-pink-400">@Controller(</span>
        <span className="text-emerald-300">'candidate'</span>
        <span className="text-pink-400">)</span>
      </div>
      <div>
        <span className="text-purple-400">export class</span>
        <span className="text-yellow-300"> CandidateController</span>
        <span className="text-gray-300"> {'{'}</span>
      </div>

      <div className="h-1"></div>

      <div className="pl-2">
        <span className="text-purple-400">constructor</span>
        <span className="text-gray-300">(</span>
      </div>
      <div className="pl-4">
        <span className="text-purple-400">private</span>
        <span className="text-blue-300"> candidateService</span>
        <span className="text-gray-300">: </span>
        <span className="text-cyan-400">CandidateService</span>
        <span className="text-gray-300">,</span>
      </div>
      <div className="pl-4">
        <span className="text-purple-400">private</span>
        <span className="text-blue-300"> emailService</span>
        <span className="text-gray-300">: </span>
        <span className="text-cyan-400">EmailService</span>
      </div>
      <div className="pl-2">
        <span className="text-gray-300">) {'{}'}</span>
      </div>

      <div className="h-1"></div>

      <div className="pl-2">
        <span className="text-pink-400">@Roles(</span>
        <span className="text-cyan-400">Role</span>
        <span className="text-gray-300">.</span>
        <span className="text-cyan-400">HR</span>
        <span className="text-gray-300">, </span>
        <span className="text-cyan-400">Role</span>
        <span className="text-gray-300">.</span>
        <span className="text-cyan-400">MANAGER</span>
        <span className="text-pink-400">)</span>
      </div>
      <div className="pl-2">
        <span className="text-pink-400">@Post(</span>
        <span className="text-emerald-300">'hire-me-please'</span>
        <span className="text-pink-400">)</span>
      </div>
      <div className="pl-2">
        <span className="text-purple-400">async</span>
        <span className="text-yellow-300"> hireMe</span>
        <span className="text-gray-300">(</span>
        <span className="text-pink-400">@Body()</span>
        <span className="text-blue-300"> dto</span>
        <span className="text-gray-300">: </span>
        <span className="text-cyan-400">HireMeDto</span>
        <span className="text-gray-300">) {'{'}</span>
      </div>

      <div className="pl-4">
        <span className="text-purple-400">const</span>
        <span className="text-blue-300"> candidate</span>
        <span className="text-gray-300"> = </span>
        <span className="text-purple-400">await</span>
        <span className="text-gray-300"> this.</span>
        <span className="text-yellow-300">candidateService</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">getProfile</span>
        <span className="text-gray-300">();</span>
      </div>

      <div className="h-0.5"></div>

      <div className="pl-4">
        <span className="text-purple-400">if</span>
        <span className="text-gray-300"> (!</span>
        <span className="text-blue-300">candidate</span>
        <span className="text-gray-300">.</span>
        <span className="text-blue-300">isAvailable</span>
        <span className="text-gray-300">) {'{'}</span>
      </div>

      <div className="pl-6">
        <span className="text-purple-400">throw new</span>
        <span className="text-yellow-300"> BadRequestException</span>
        <span className="text-gray-300">(</span>
        <span className="text-emerald-300">'Currently not available'</span>
        <span className="text-gray-300">);</span>
      </div>

      <div className="pl-4">
        <span className="text-gray-300">{'}'}</span>
      </div>

      <div className="h-0.5"></div>

      <div className="pl-4">
        <span className="text-purple-400">await</span>
        <span className="text-gray-300"> this.</span>
        <span className="text-yellow-300">emailService</span>
        <span className="text-gray-300">.</span>
        <span className="text-yellow-300">sendOffer</span>
        <span className="text-gray-300">(</span>
        <span className="text-blue-300">dto</span>
        <span className="text-gray-300">);</span>
      </div>

      <div className="h-0.5"></div>

      <div className="pl-4">
        <span className="text-purple-400">return</span>
        <span className="text-gray-300"> {'{'} </span>
        <span className="text-blue-300">message</span>
        <span className="text-gray-300">: </span>
        <span className="text-emerald-300">'Thanks! I&apos;ll be in touch soon.'</span>
        <span className="text-gray-300"> {'}'};</span>
      </div>

      <div className="pl-2">
        <span className="text-gray-300">{'}'}</span>
      </div>

      <div>
        <span className="text-gray-300">{'}'}</span>
      </div>
    </div>
  );
};

export default ControllerCode;