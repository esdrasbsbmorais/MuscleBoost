import React from "react";
import NavBar from "../components/app/NavBar";
import LogoMuscleVM from "../assets/logos/LogoMuscleVM.svg";
import { profiles } from "../api/objectProfiles";

export default function Contact() {
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111] main-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl p-10 bg-[#191919] bg-opacity-90 rounded-xl shadow-2xl">
          {profiles.map((profile) => (
            <div key={profile.name} className="relative bg-gradient-to-br from-[#301414] to-[#552424] rounded-lg p-6">
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-[#191919]">
                {/* <img src={profile.imageUrl} alt={profile.altText} className="w-full h-full object-cover" /> */}
                <img src={LogoMuscleVM} alt={profile.altText} className="w-full h-full object-cover" />
              </div>
              <div className="pt-16">
                <h2 className="text-xl font-bold text-white mt-4">{profile.name}</h2>
                <p className="text-white mb-2">{profile.role}</p>
                <p className="text-white mb-2">{profile.location}</p>
                <p className="text-white mb-2">Email: {profile.email}</p>
                <p className="text-white mb-2">
                  LinkedIn: <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-500">{profile.linkedin}</a>
                </p>
                {profile.personalLink && (
                  <p className="text-white mb-2">
                    Personal: <a href={profile.personalLink} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-500">{profile.personalLink}</a>
                  </p>
                )}
                <h3 className="text-lg font-bold text-white mt-4 mb-2">Principais competências</h3>
                <ul className="text-white">
                  {profile.skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
