import React from 'react';

const ControllerCode = () => {
  return (
    <div className="space-y-1 text-sm">
      <div className="text-yellow-300">@UseGuards(RolesGuard)</div>
      <div className="text-yellow-300">@Roles(Roles.HR, Roles.MANAGER)</div>
      <div className="text-blue-300">@Post('/hire-me-please')</div>
      <div className="text-white">
        <span className="text-purple-300">async function</span>{' '}
        <span className="text-yellow-300">hireMe</span>
        <span className="text-white">(</span>
        <span className="text-yellow-300">@Body()</span>{' '}
        <span className="text-blue-300">hireMeDto</span>
        <span className="text-white">: </span>
        <span className="text-green-300">HireMeDto</span>
        <span className="text-white">) {'{'}</span>
      </div>



      <div className="pl-4 space-y-1">
        <div className="text-white">
          <span className="text-gray-300">// Note: For brevity, service calls are shown inline here.
          </span>{' '}
          
        </div>
        <div className="text-white">
          <span className="text-purple-300">const</span>{' '}
          <span className="text-blue-300">candidate</span> ={' '}
          <span className="text-purple-300">await</span>{' '}
          <span className="text-orange-300">fetchCandidateProfile()</span>
          <span className="text-white">;</span>
        </div>

        <div className="text-white">
          <span className="text-purple-300">const</span>{' '}
          <span className="text-blue-300">skillsReviewed</span> ={' '}
          <span className="text-purple-300">await</span>{' '}
          <span className="text-orange-300">reviewSkills</span>(
          <span className="text-blue-300">candidate.skills</span>
          <span className="text-white">);</span>
        </div>

        <div className="text-white">
          <span className="text-purple-300">if</span> (
          <span className="text-blue-300">!candidate.isAvailable</span>)
          {' {'}
        </div>
        <div className="pl-4 text-white">
          <span className="text-purple-300">return</span> {'{'}<br />
          &nbsp;&nbsp;<span className="text-blue-300">message</span>: <span className="text-orange-300">'Thank you for reaching out. I’m currently unavailable.'</span><br />
          {'};'}
        </div>
        <div className="text-white">{'}'}</div>

        <div className="text-white">
          <span className="text-purple-300">const</span>{' '}
          <span className="text-blue-300">response</span> ={' '}
          <span className="text-purple-300">await</span>{' '}
          <span className="text-orange-300">sendOffer</span>(
          <span className="text-blue-300">candidate.email</span>,{' '}
          <span className="text-blue-300">hireMeDto.recruiter</span>,{' '}
          <span className="text-blue-300">hireMeDto.offerMessage</span>
          <span className="text-white">);</span>
        </div>

        <div className="text-white">
          <span className="text-purple-300">if</span> (
          <span className="text-blue-300">skillsReviewed</span> &&{' '}
          <span className="text-blue-300">response</span>) {'{'}
        </div>
        <div className="pl-4 text-white">
          <span className="text-purple-300">return</span> {'{'}<br />
          &nbsp;&nbsp;<span className="text-blue-300">message</span>: <span className="text-orange-300">'I appreciate the opportunity. Let’s discuss this further.'</span><br />
          {'};'}
        </div>
        <div className="text-white">{'}'}</div>

        <div className="text-white">
          <span className="text-purple-300">return</span> {'{'}<br />
          &nbsp;&nbsp;<span className="text-blue-300">message</span>: <span className="text-orange-300">'Something went wrong. Please try again.'</span><br />
          {'};'}
        </div>
      </div>

      <div className="text-white">{'}'}</div>
    </div>
  );
};

export default ControllerCode;
