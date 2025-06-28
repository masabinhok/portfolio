import React from 'react';

const DataCode = () => {
  return (
    <div className="space-y-1 text-sm">
      <div className="flex space-x-1">
        <div className="text-blue-300">export const</div>
        <div className="text-yellow-300">candidateProfile</div>
        <div className="text-white">: Candidate = {'{'}</div>
      </div>

      <div className="pl-6 space-y-2">
        <div className="text-blue-300">
          fullName: <span className="text-orange-300">'Sabin Shrestha'</span>,
        </div>

        <div className="text-blue-300">
          email: <span className="text-orange-300">'sabin.shrestha@example.com'</span>,
        </div>

        <div className="text-blue-300">
          skills: [
          <span className="text-orange-300">'TypeScript'</span>,{' '}
          <span className="text-orange-300">'NestJS'</span>,{' '}
          <span className="text-orange-300">'PostgreSQL'</span>,{' '}
          <span className="text-orange-300">'Prisma'</span>,{' '}
          <span className="text-orange-300">'Docker'</span>
          ],
        </div>

        <div className="text-blue-300">
          isAvailable: <span className="text-green-300">true</span>,
        </div>

        <div className="text-blue-300">
          projects: [
          <span className="text-orange-300">'SkillSwap'</span>,{' '}
          <span className="text-orange-300">'Chess Trainer'</span>
          ],
        </div>

        <div className="text-blue-300">
          linkedin: <span className="text-orange-300">'https://linkedin.com/in/sabinshrestha'</span>,
        </div>

        <div className="text-blue-300">
          github: <span className="text-orange-300">'https://github.com/sabin'</span>,
        </div>

        <div className="text-blue-300">
          x: <span className="text-orange-300">'https://twitter.com/sabin'</span>,
        </div>
      </div>

      <div className="text-white">{'};'}</div>
    </div>
  );
};

export default DataCode;
