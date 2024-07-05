"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { MdAddCircleOutline, MdArrowDropDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Modal from "@/components/generalModal/Modal";
import Button from "@/components/buttons/button";

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
  const [selectedProject, setSelectedProject] = useState<string>("Project 1");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const projectNames = ["Project 1", "ML Kwarta Padala"];

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
            className="border rounded-full pl-10 pr-4 py-2 italic w-96 hover:bg-gray-50"
          />
          <CiSearch className="absolute left-5 top-3.5 text-black-400" />
        </div>
        <div className="ml-auto">
          <button
            className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
            onClick={() => setIsOpenModal(true)}
          >
            <div className="border border-green-900 bg-green-900 rounded-full">
              <FaPlus className="text-white" />
            </div>
            Create new project
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
            {projects.map((project, index) => {
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
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="flex justify-center items-center  bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 border-t-4 border-red-900 h-96">
            <h2 className="flex justify-center text-xl font-bold mb-6 items-center">
              Create New Project
            </h2>
            <form>
              <div className="mb-10">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="w-full p-2 border border-gray-300 rounded-full drop-shadow-xl"
                />
              </div>
              <div className="mb-10 relative">
                <input
                  type="text"
                  placeholder="Modules"
                  className="w-full p-2 pr-10 border border-gray-300 rounded-full drop-shadow-xl"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white text-red-900"
                >
                  <MdAddCircleOutline className="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-900 cursor-pointer text-red-900" />
                </button>
              </div>
              <div className="mb-4 flex justify-between">
                <input
                  type="date"
                  placeholder="Due"
                  className="w-full p-2 border border-gray-300 rounded-full drop-shadow-xl"
                />
              </div>

              <Button title="Add" />
            </form>
          </div>
        </div>
      </Modal>
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
