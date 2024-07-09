import React from "react";

interface AllDeveloper {
  name: string;
  email: string;
}

const listAllDeveloper: AllDeveloper[] = [
  {
    name: "Christine Mae Ocana",
    email: "christinemae.ocana@mlhuiller.com",
  },
  {
    name: "Jovie Jurac",
    email: "juvieme.jurac@mlhuiller.com",
  },
  {
    name: "Marian Adonay",
    email: "marian.adonay@mlhuiller.com",
  },
  {
    name: "Francis Cutamora",
    email: "francis.cutamora@mlhuiller.com",
  },
];

const AllDeveloper = () => {
  return (
    <div className="flex flex-row">
      <div className="bg-white-100 shadow-lg border rounded-2xl w-full h-full">
        <div className="px-6 py-2">
          <h1 className="font-bold text-md  text-red-900">All Developers</h1>
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
