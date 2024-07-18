import React from "react";
import { DeveloperDetails } from "@/interfaces/IDeveloperDetails";
import { getAvailableDevelopers } from "@/utils/DeveloperFunc/SelectAvailableDev";

interface AllDeveloper {
  name: string;
  email: string;
}

const listAllDeveloper: AllDeveloper[] = [];
const getAvailableDev = async () => {
  const result = await getAvailableDevelopers(1, 0, 10);
  const { data } = result;
  console.log(data);

  data.map((dev: DeveloperDetails) => {
    const formattedProject = {
      name: `${dev.first_name} ${dev.last_name}`,
      email: dev.email,
    };

    if (data.length > listAllDeveloper.length) {
      if (
        listAllDeveloper.find((item) => item.name === formattedProject.name) ===
        undefined
      ) {
        listAllDeveloper.push(formattedProject);
      }
    }
  });
  return result;
};

const AllDeveloper = () => {
  getAvailableDev();
  return (
    <div className="flex flex-row">
      <div className="bg-white-100 shadow-lg border rounded-2xl w-full h-full">
        <div className="px-6 py-2">
          <h1 className="font-bold text-md  text-red-900">
            Available Developers
          </h1>
        </div>
        <div className="text-center px-6">
          <table className="w-full rounded-xl text-center">
            <thead>
              <tr>
                <th className="py-3 px-9 th-gap font-semibold text-gray-500">
                  Name
                </th>
                <th className="py-3 px-20 th-gap font-semibold text-gray-500">
                  Emails
                </th>
              </tr>
            </thead>
            <tbody>
              {listAllDeveloper.map((developer, index) => (
                <tr key={index} className="border-b border-dashed">
                  <td className="py-2 px-5 text-sm">{developer.name}</td>
                  <td className="py-2 px-12 italic  font-light text-sm text-gray-400">
                    {developer.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDeveloper;
