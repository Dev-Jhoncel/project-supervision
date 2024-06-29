"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { MdArrowDropDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

interface Project {
  module: string;
  developer: string;
  due: string;
  status: "Ongoing" | "Delay" | "Completed" | "At Risk";
  profilePicture: string;
}

const projects: Project[] = [
  {
    module: "Login",
    developer: "Christine Mae Ocana",
    due: "Jun 20, 2024",
    status: "Ongoing",
    profilePicture: "cprofile.jpg",
  },
  {
    module: "Dashboard",
    developer: "Jovie Jurac",
    due: "Jun 20, 2024",
    status: "Delay",
    profilePicture: "jprofile.jpg",
  },
  {
    module: "Backend",
    developer: "Francis Cutamora",
    due: "Jun 21, 2024",
    status: "Completed",
    profilePicture: "fprofile.jpg",
  },
  {
    module: "Lorem lorem",
    developer: "Marian Adonay",
    due: "Jun 19, 2024",
    status: "At Risk",
    profilePicture: "mprofile.jpg",
  },
  {
    module: "Lorem lorem lorem",
    developer: "Nelson Young",
    due: "Jun 19, 2024",
    status: "Completed",
    profilePicture: "nprofile.jpg",
  },
];

const statusOptions: ("Ongoing" | "Delay" | "Completed" | "At Risk")[] = [
  "Ongoing",
  "Delay",
  "Completed",
  "At Risk",
];

const ProjectCard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: number]: string | undefined;
  }>({});

  const handleStatusChange = (index: number, status: string) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [index]: status,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "bg-yellow-500";
      case "Delay":
        return "bg-orange-500";
      case "Completed":
        return "bg-green-500";
      case "At Risk":
        return "bg-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 flex flex-col gap-9">
      <div>
        <h1 className="font-bold text-2xl">Projects</h1>
      </div>
      <div className="flex items-center justify-between gap-96">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for project"
            className="border rounded-full pl-10 pr-4 py-2  italic w-96 hover:bg-gray-50"
          />
          <CiSearch className="absolute left-5 top-3.5 text-black-400" />
        </div>
        <div className="ml-auto">
          <button className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black">
            <div className="border border-green-900 bg-green-900 rounded-full ">
              <FaPlus className="text-white" />
            </div>
            Create new project
          </button>
        </div>
      </div>
      <div className="p-4 bg-white-100 bg-opacity-50 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          Project Name: ML Kwarta Padala
          <MdArrowDropDown className="ml-2 transition-transform transform hover:scale-150" />
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-red-50 bg-opacity-60 rounded-xl text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-400 text-left">
                  Module
                </th>
                <th className="py-2 px-4 border-b border-gray-400 text-left">
                  Developer
                </th>
                <th className="py-2 px-4 border-b border-gray-400 text-left">
                  Due
                </th>
                <th className="py-2 px-4 border-b border-gray-400 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => {
                const currentStatus = selectedStatus[index] || project.status;
                return (
                  <tr
                    key={index}
                    className="hover:font-semibold border-b border-gray-300 border-dashed my-4"
                  >
                    <td className="relative py-4 ">{project.module}</td>
                    <td className="flex items-center gap-2 py-4">
                      <img
                        src={project.profilePicture}
                        alt={project.developer}
                        className="w-6 h-6 rounded-full object-cover relative"
                      />
                      {project.developer}
                    </td>
                    <td className="py-4">{project.due}</td>
                    <td className="py-4">
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                        className={`pr-6 py-2 rounded-full text-white text-sm ${getStatusColor(
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
    </div>
  );
};

const ProjectPage: React.FC = () => {
  return (
    <Layout>
      <ProjectCard />
    </Layout>
  );
};

export default ProjectPage;
