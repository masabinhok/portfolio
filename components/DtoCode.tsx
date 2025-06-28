import React from 'react';

const DtoCode = () => {
  return (
    <div className="space-y-0.5 text-sm leading-5 font-mono">
      <div>
        <span className="text-gray-500">{/* Data Transfer Object for hire requests */}</span>
      </div>

      <div>
        <span className="text-purple-400">export class</span>
        <span className="text-yellow-300"> HireMeDto</span>
        <span className="text-gray-300"> {'{'}</span>
      </div>

      <div className="pl-2">
        <span className="text-pink-400">@IsEmail()</span>
      </div>
      <div className="pl-2">
        <span className="text-pink-400">@IsKind()</span>
      </div>
      <div className="pl-2">
        <span className="text-pink-400">@IsGenerous()</span>
      </div>
      <div className="pl-2">
        <span className="text-blue-300">recruiter</span>
        <span className="text-gray-300">: </span>
        <span className="text-cyan-400">string</span>
        <span className="text-gray-300">;</span>
      </div>

      <div className="h-1"></div>

      <div className="pl-2">
        <span className="text-pink-400">@Default(
          <span className='text-emerald-300'>
            &apos;backend-dev&apos;
          </span>
          )</span>
      </div>
      <div className="pl-2">
        <span className="text-pink-400">@IsIn([</span>
        <span className="text-emerald-300">&apos;frontend-dev&apos;</span>
        <span className="text-gray-300">, </span>
        <span className="text-emerald-300">&apos;backend-dev&apos;</span>
        <span className="text-gray-300">, </span>
        <span className="text-emerald-300">&apos;fullstack-dev&apos;</span>
        <span className="text-pink-400">])</span>
      </div>
      <div className="pl-2">
        <span className="text-blue-300">role</span>
        <span className="text-gray-300">?: </span>
        <span className="text-cyan-400">string</span>
        <span className="text-gray-300">;</span>
      </div>

      <div className="h-1"></div>
      <div className="pl-2">
        <span className="text-pink-400">@HasPositiveVibes()</span>
      </div>

      <div className="pl-2">

        <span className="text-pink-400">@MinLength(</span>
        <span className="text-orange-400">10</span>
        <span className="text-gray-300">, {'{'} </span>
        <span className="text-blue-300">message</span>
        <span className="text-gray-300">: </span>
        <span className="text-emerald-300">&apos;Make it worth reading!&apos;</span>
        <span className="text-gray-300"> {'}'})</span>
      </div>
      <div className="pl-2">
        <span className="text-blue-300">message</span>
        <span className="text-gray-300">: </span>
        <span className="text-cyan-400">string</span>
        <span className="text-gray-300">;</span>
      </div>

      <div>
        <span className="text-gray-300">{'}'}</span>
      </div>
    </div>
  );
};

export default DtoCode;