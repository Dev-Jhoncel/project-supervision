"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdArrowDropDown, MdAddCircleOutline } from "react-icons/md";
import Modal from "@/components/generalModal/Modal";

const Modulist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [module] = useState([
    {
      module: "Module A",
      developer: "Christine Mae Ocana",
      due: "July 10, 2024",
      status: "In Progress",
      profilePicture: "cprofile.jpg",
    },
    {
      module: "Module B",
      developer: "Joshua Francis Cutamora",
      due: "July 10, 2024",
      status: "Pending",
      profilePicture: "fprofile.jpg",
    },
    {
      module: "Module C",
      developer: "Jovie Jurac",
      due: "July 11, 2024",
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

  // Modal state and handlers
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newModule, setNewModule] = useState("");
  const [newDeveloper, setNewDeveloper] = useState("");
  const [developers] = useState(["Developer A", "Developer B", "Developer C"]);
  const [modules, setModules] = useState<
    { module: string; developer: string }[]
  >([]);

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

  const addModule = () => {
    if (newModule && newDeveloper) {
      setModules([...modules, { module: newModule, developer: newDeveloper }]);
      setNewModule("");
      setNewDeveloper("");
    }
  };

  const handleCancelEdit = () => {
    setIsOpenModal(false);
    // Reset any other form state if needed
  };

  return (
    <div className="p-6 flex flex-col gap-9">
      <div className="flex items-center justify-between gap-96">
        <div className="ml-auto">
          <button
            className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
            onClick={() => setIsOpenModal(true)}
          >
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

      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="flex justify-center items-center rounded-lg bg-gray-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg border-t-4 border-red-900">
            <h2 className="flex justify-center text-xl font-bold mb-6 items-center">
              Add Modules
            </h2>
            <form>
              <div className="mb-6 relative">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    placeholder="Module"
                    className="w-2/3 p-3 border border-gray-300 rounded-full drop-shadow-xl"
                  />
                  <select
                    value={newDeveloper}
                    onChange={(e) => setNewDeveloper(e.target.value)}
                    className="ml-2 w-1/3 p-3 border border-gray-300 rounded-full drop-shadow-xl"
                  >
                    <option value="" disabled>
                      Select Developer
                    </option>
                    {developers.map((dev) => (
                      <option key={dev} value={dev}>
                        {dev}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="ml-2 p-2 rounded-full bg-white text-red-900"
                    onClick={addModule}
                  >
                    <MdAddCircleOutline className="w-6 h-6 hover:text-gray-900 cursor-pointer text-red-900" />
                  </button>
                </div>
                <div className="mt-4">
                  {modules.map((mod, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-4 border-b border-gray-300"
                    >
                      <span>{mod.module}</span> - <span>{mod.developer}</span>
                      <button
                        type="button"
                        className="text-red-600"
                        onClick={() => {
                          setModules(modules.filter((_, i) => i !== index));
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-full text-sm ml-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modulist;
