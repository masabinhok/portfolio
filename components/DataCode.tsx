import { projects, skills, socials } from '@/constants/constants';
import Link from 'next/link';
import React from 'react';

const DataCode = () => {

  return (
    <div className="space-y-0.5 text-sm leading-5">
      <div className="pt-2">
        <span className="text-gray-500">{/* Ready to contribute! */}</span>
      </div>
      <div className="flex">
        <span className="text-purple-400">export const</span>
        <span className="text-yellow-300 ml-2">candidateProfile</span>
        <span className="text-cyan-400 ml-2">: Candidate</span>
        <span className="text-gray-300 ml-2">= {'{'}</span>
      </div>

      <div className="pl-4 space-y-1">
        <div>
          <span className="text-blue-300">fullName</span>
          <span className="text-gray-300">: </span>
          <span className="text-emerald-300">&apos;Sabin Shrestha&apos;</span>
          <span className="text-gray-300">,</span>
        </div>

        <div>
          <span className="text-blue-300">email</span>
          <span className="text-gray-300">: </span>
          <span className="text-emerald-300">&apos;sabin.shrestha.er@gmail.com&apos;</span>
          <span className="text-gray-300">,</span>
        </div>

        <div>
          <span className="text-blue-300">skills</span>
          <span className="text-gray-300">: [</span>
          {skills.map((skill, idx) => (
            <div className='' key={idx}>
              <span className="text-emerald-300">&apos;{skill}&apos;</span>
              <span className="text-gray-300">{idx === skills.length - 1 ? '' : ','}</span>
            </div>
          ))}
          <span className="text-gray-300">],</span>
        </div>

        <div>
          <span className="text-blue-300">isAvailable</span>
          <span className="text-gray-300">: </span>
          <span className="text-orange-400">true</span>
          <span className="text-gray-300">,</span>
        </div>

        <div>
          <span className="text-blue-300">projects</span>
          <span className="text-gray-300">: [</span>
          {
            projects.map((project, idx) => (
              <Link target='_blank' key={idx} href={project.url}>
                <span className="text-emerald-300">&apos;{project.name}&apos;</span>
                <span className="text-gray-300">{idx === projects.length - 1 ? '' : ','}</span>
              </Link>
            ))
          }
          <span className="text-gray-300">],</span>
        </div>

        {socials.map((social, idx) => (
          <div key={idx}>
            <span className="text-blue-300">{social.social}</span>
            <span className="text-gray-300">: </span>
            <Link target='_blank' href={social.url}>
              <span className="text-emerald-300">&apos;{social.username}&apos;</span>
            </Link>
            <span className="text-gray-300">,</span>
          </div>
        ))}
      </div >

      <div className="text-gray-300">{'};'}</div>


    </div >
  );
};

export default DataCode;