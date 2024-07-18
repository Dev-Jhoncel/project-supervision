import React from "react";
import { getTopDevelopers } from "@/utils/DeveloperFunc/SelectTopDev";
import { DeveloperDetails } from "@/interfaces/IDeveloperDetails";

interface Developer {
  name: string;
  department: string;
  ratings: number;
  profilePicture: string;
}

const initialDevelopersData: Developer[] = [];
const profilePic = ["cprofile.jpg", "fprofile.jpg"];
const randomIndex = Math.floor(Math.random() * profilePic.length);

const getTopDev = async () => {
  const result = await getTopDevelopers(1, 0, 10);
  const { data } = result;
  data.map((dev: DeveloperDetails) => {
    const formattedProject = {
      name: `${dev.first_name} ${dev.last_name}`,
      department: dev.role,
      ratings: dev.points,
      profilePicture: profilePic[randomIndex],
    };
    if (data.length > initialDevelopersData.length) {
      initialDevelopersData.push(formattedProject);
    }
  });
  return result;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xl ${
            i < rating ? "text-yellow-500" : "text-gray-700"
          }`}
        >
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

const TopDevelopers = () => {
  getTopDev();
  return (
    <div className="flex flex-row">
      <div className="bg-white-100 shadow-lg bg-gradient-to-tl rounded-2xl border w-full h-64">
        <div className="px-6 py-2">
          <h1 className="font-bold text-md  text-red-900">Top Developers</h1>
        </div>
        <table className="w-full bg-white-50 bg-opacity-60 rounded-xl text-left border-dashed border-spacing-1">
          <thead>
            <tr>
              <th className="py-3 px-9 th-gap font-semibold text-gray-500">
                Name
              </th>
              <th className="py-3 px-9 th-gap font-semibold text-gray-500">
                Department
              </th>
              <th className="py-3 px-9 font-semibold text-gray-500">Ratings</th>
            </tr>
          </thead>
          <tbody>
            {initialDevelopersData.map((developer, index) => (
              <tr key={index}>
                <td className="py-3 px-20 text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={developer.profilePicture}
                      alt={`${developer.name}'s profile`}
                      className=" -ml-9 w-6 h-6 rounded-full object-cover border-2 border-gray-300"
                    />
                    <span>{developer.name}</span>
                  </div>
                </td>
                <td className=" text-sm py-3 px-9">{developer.department}</td>
                <td className="text-sm py-3 px-9">
                  <StarRating rating={developer.ratings} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDevelopers;
