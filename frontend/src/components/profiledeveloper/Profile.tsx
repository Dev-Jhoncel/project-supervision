import React from "react";
import { IoIosClose } from "react-icons/io";

interface Developer {
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  ratings: number;
  skills: string[];
  projects: { name: string; status: string }[];
}

interface ProfileProps {
  developer: Developer;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ developer, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-5/12 h-70 shadow-lg p-6 rounded-lg bg-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  text-red-900 px-2 rounded text-3xl"
        >
          <IoIosClose />
        </button>
        <div className="flex items-center space-x-4">
          <img
            src={developer.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{developer.name}</h1>
            <h2 className="text-sm text-gray-600">
              {developer.email} / {developer.phone}
            </h2>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Ratings:</h2>
          <div className="flex space-x-1">
            {[...Array(developer.ratings)].map((_, i) => (
              <span key={i} className="text-yellow-500">
                ⭐
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="mt-4 w-52 border border-white shadow-lg">
            <h2 className="text-lg font-semibold ml-6">Skills</h2>
            <hr className="my-2 border-t-1 border-red-900 opacity-35" />
            <ul className="list-disc list-inside space-y-1 ml-6">
              {developer.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 w-96 shadow-lg ml-20">
            <h2 className="text-lg font-semibold ml-5">Projects</h2>
            <hr className="my-2 border-t-1 border-red-900 opacity-35" />
            <ul className="space-y-1 ml-6">
              {developer.projects.map((project, index) => (
                <li key={index} className="flex justify-between mr-8">
                  <span>{project.name}</span>
                  <span
                    className={`text-${
                      project.status === "Done" ? "green" : "orange"
                    }-500`}
                  >
                    {project.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
