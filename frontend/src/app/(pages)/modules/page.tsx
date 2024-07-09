"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const Modulist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [module] = useState([
    {
      module: "Module A",
      developer: "Christine Mae Ocana",
      due: "July 10,2024",
      status: "In Progress",
      profilePicture: "cprofile.jpg",
    },
    {
      module: "Module B",
      developer: "Joshua Francis Cutamora",
      due: "July 10,2024",
      status: "Pending",
      profilePicture: "fprofile.jpg",
    },
    {
      module: "Module C",
      developer: "Jovie Jurac",
      due: "July 11,2024",
      status: "Completed",
      profilePicture: "jprofile.jpg",
    },
  ]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const statusOptions = ["At Risk", "In Progress", "Pending", "Completed"];

  const projectNames = [
    "ML Kwarta Padala",
    "ML Shop",
    "ML Wallet",
    "ML Kyuties",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusChange = (index: number, value: string) => {
    const updatedStatus = [...selectedStatus];
    updatedStatus[index] = value;
    setSelectedStatus(updatedStatus);
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case "At Risk":
        return "bg-red-500 text-white";
      case "In Progress":
        return "bg-yellow-500 text-white";
      case "Pending":
        return "bg-orange-500 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 flex flex-col gap-9">
      <div></div>
      <div className="flex items-center justify-between gap-96">
        <div className="ml-auto">
          <button className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black">
            <div className="border border-green-900 bg-green-900 rounded-full">
              <FaPlus className="text-white" />
            </div>
            Add Modules
          </button>
        </div>
      </div>
      <div>
        <h2
          className="text-xl font-bold mb-2 flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          Project Name: {selectedProject}
          <MdArrowDropDown
            className={`ml-2 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            } hover:scale-150`}
          />
        </h2>
        {isOpen && (
          <ul className="text-sm mt-2 bg-white-200 w-52 rounded-lg shadow-md">
            {projectNames.map((name, index) => (
              <li
                key={index}
                className="py-1 px-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => {
                  setSelectedProject(name);
                  setIsOpen(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-red-50 bg-opacity-60 rounded-xl text-left border-dashed">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Module
              </th>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Developer
              </th>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Due
              </th>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {module.map((project, index) => {
              const currentStatus = selectedStatus[index] || project.status;
              return (
                <tr
                  key={index}
                  className="hover:font-semibold border-b border-gray-300 border-dashed my-2"
                >
                  <td className="text-sm relative py-5">{project.module}</td>
                  <td className="text-sm flex items-center gap-2 py-10">
                    <img
                      src={project.profilePicture}
                      alt={project.developer}
                      className="flex items-center w-4 h-4 rounded-full object-cover relative"
                    />
                    {project.developer}
                  </td>
                  <td className="text-sm py-4">{project.due}</td>
                  <td className="py-4">
                    <select
                      value={currentStatus}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className={`pr-1 py-2 rounded text-white text-sm ${getStatusColor(
                        currentStatus
                      )}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modulist;
