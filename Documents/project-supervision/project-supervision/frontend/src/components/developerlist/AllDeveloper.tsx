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
];

const AllDeveloper = () => {
  return (
    <div className="flex flex-row">
      <div className="bg-red-100 shadow-xl bg-gradient-to-tl rounded-b-2xl rounded-t-2xl w-full h-64 ml-2 pr-20 -m-1">
        <h1 className="font-bold text-xl mt-5 ml-4">All Developers</h1>
        <table className="w-full rounded-xl text-left border-dashed border-spacing-1">
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
              <tr key={index}>
                <td className="py-3 px-9 text-sm">{developer.name}</td>
                <td className="py-3 px-12 italic font-extralight font-semibold text-sm text-gray-400">
                  {developer.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeveloper;
