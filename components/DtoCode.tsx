import React from 'react';

const DtoCode = () => {
  return (
    <pre className="bg-gray-900 text-sm font-mono p-4 rounded-md overflow-x-auto">
      <code>
        <span className="text-blue-300">export class</span>{' '}
        <span className="text-yellow-300">HireMeDto</span> {'{\n'}
        {'  '}
        <span className="text-gray-400">// For the warm-hearted recruiter</span>{'\n'}
        {'  '}
        <span className="text-purple-300">@IsEmail()</span>{'\n'}
        {'  '}
        <span className="text-purple-300">@IsKind()</span>{'\n'}
        {'  '}
        <span className="text-white">recruiter:</span>{' '}
        <span className="text-green-300">string;</span>{'\n\n'}

        {'  '}
        <span className="text-purple-300">@default('backend-developer')</span>{'\n'}
        {'  '}
        <span className="text-white">role:</span>{' '}
        <span className="text-green-300">string;</span>{'\n\n'}

        {'  '}
        <span className="text-purple-300">@IsPositive()</span>{'\n'}
        {'  '}
        <span className="text-purple-300">
          @MinLength({'{'} message: <span className="text-orange-300">'Make your offer worth reading!'</span> {'}'})
        </span>{'\n'}
        {'  '}
        <span className="text-white">offerMessage:</span>{' '}
        <span className="text-green-300">string;</span>{'\n'}
        {'}'}
      </code>
    </pre>
  );
};

export default DtoCode;
  