import React from "react";

// Define the Project interface
interface Project {
  name: string;
  module: number;
  dueDate: Date;
}

// Correct the array of projects
const projects: Project[] = [
  {
    name: "ML Kwarta Padala",
    module: 7,
    dueDate: new Date("2024-07-19"),
  },
  {
    name: "ML Kwarta Padala",
    module: 7,
    dueDate: new Date("2024-07-19"),
  },
];

const ProjectList: React.FC = () => {
  return (
    <div className="bg-red-100 shadow-xl bg-gradient-to-tl rounded-2xl p-4 mt-4 h-56">
      <h2 className="font-bold text-xl mb-4">Projects</h2>
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="py-2 px-4">Project Name</th>
            <th className="py-2 px-4">Module</th>
            <th className="py-2 px-4">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{project.name}</td>
              <td className="py-2 px-4">{project.module}</td>
              <td className="py-2 px-4">
                {project.dueDate.toDateString()}
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
