import React from "react";

interface Project {
  name: string;
  module: number;
  dueDate: Date;
  status: "Ongoing" | "Delay" | "Completed" | "At Risk";
}

const projects: Project[] = [
  {
    name: "ML Kwarta Padala",
    module: 7,
    dueDate: new Date("2024-07-19"),
    status: "Ongoing",
  },
  {
    name: "ML Kwarta Padala",
    module: 7,
    dueDate: new Date("2024-07-19"),
    status: "Delay",
  },
  {
    name: "ML Kwarta Padala",
    module: 7,
    dueDate: new Date("2024-07-19"),
    status: "At Risk",
  },
];

const ProjectList: React.FC = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "text-yellow-500";
      case "Delay":
        return "text-orange-500";
      case "At Risk":
        return " text-red-500";
      case "Completed":
        return " text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white shadow-lg border bg-gradient-to-tl rounded-2xl mt-4 h-56">
      <div className="px-6 py-2">
        <h1 className="font-bold text-md text-red-900">Projects</h1>
      </div>
      <div className="px-20">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2 px-4">Project Name</th>
              <th className="py-2 px-4">Module</th>
              <th className="py-2 px-4">Due Date</th>
              <th className="py-2 px-10">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="border-b border-dashed">
                <td className="py-2 px-4 text-sm">{project.name}</td>
                <td className="py-2 px-10 text-sm">{project.module}</td>
                <td className="py-2 px-4 text-sm">
                  {project.dueDate.toDateString()}
                </td>
                <td
                  className={`py-2 px-10 text-sm ${getStatusClass(
                    project.status
                  )}`}
                >
                  {project.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
