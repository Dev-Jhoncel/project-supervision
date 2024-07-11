"use client";
import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Modal from "@/components/generalModal/Modal";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";

const Modulist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [modules, setModules] = useState([
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
  const [newDue, setNewDue] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [developers] = useState([
    "Christine Mae Ocana",
    "Joshua Francis Cutamora",
    "Jovie Jurac",
    "Marian Adonay",
  ]);

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleBack = () => {
    router.back();
  };

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
    if (newModule && newDeveloper && newDue && newStatus) {
      setModules([
        ...modules,
        {
          module: newModule,
          developer: newDeveloper,
          due: newDue,
          status: newStatus,
          profilePicture: "default.jpg",
        },
      ]);
      setNewModule("");
      setNewDeveloper("");
      setNewDue("");
      setNewStatus("");
      setIsOpenModal(false);
    }
  };

  const handleCancelEdit = () => {
    setIsOpenModal(false);
    setNewModule("");
    setNewDeveloper("");
    setNewDue("");
    setNewStatus("");
    setIsEditing(false);
    setEditIndex(null);
  };

  const deleteModule = (index: number) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const editModule = (index: number) => {
    const moduleToEdit = modules[index];
    setNewModule(moduleToEdit.module);
    setNewDeveloper(moduleToEdit.developer);
    setNewDue(moduleToEdit.due);
    setNewStatus(moduleToEdit.status);
    setIsEditing(true);
    setEditIndex(index);
    setIsOpenModal(true);
  };

  const saveEditModule = () => {
    if (
      editIndex !== null &&
      newModule &&
      newDeveloper &&
      newDue &&
      newStatus
    ) {
      const updatedModules = [...modules];
      updatedModules[editIndex] = {
        module: newModule,
        developer: newDeveloper,
        due: newDue,
        status: newStatus,
        profilePicture: "default.jpg",
      };
      setModules(updatedModules);
      handleCancelEdit();
    }
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col gap-9">
        <div className="flex items-center justify-between">
          <button
            className="text-2xl hover:text-red-900 cursor-pointer"
            onClick={handleBack}
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
            onClick={() => setIsOpenModal(true)}
          >
            <div className="border border-green-900 bg-green-900 rounded-full">
              <FaPlus className="text-white" />
            </div>
            Add Modules
          </button>
        </div>
        <div>
          {isOpen && (
            <ul className="text-sm mt-2 bg-white w-52 rounded-lg shadow-md">
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
          <table className="min-w-full bg-white rounded-xl text-left border-dashed">
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
                <th className="py-2 px-4 border-b border-gray-400 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {modules.map((project, index) => {
                const currentStatus = selectedStatus[index] || project.status;
                return (
                  <tr
                    key={index}
                    className="text-sm hover:bg-gray-50 border-b border-dashed border-gray-300 cursor-pointer "
                  >
                    <td className="py-4 px-4">{project.module}</td>
                    <td className="py-4 px-4 flex items-center gap-2">
                      <img
                        src={project.profilePicture}
                        alt={project.developer}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      {project.developer}
                    </td>
                    <td className="py-4 px-4">{project.due}</td>
                    <td className="py-4 px-4">
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                        className={`pr-1 py-1 rounded text-white ${getStatusColor(
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
                    <td className="py-4 px-4 flex gap-2">
                      <button
                        className="text-yellow-700 hover:text-yellow-500"
                        onClick={() => editModule(index)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-700 hover:text-red-500"
                        onClick={() => deleteModule(index)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <div className="flex justify-center items-center rounded-lg bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border-t-4 border-red-900">
              <h2 className="flex justify-center text-xl font-bold mb-6 items-center">
                {isEditing ? "Edit Module" : "Add Modules"}
              </h2>
              <form>
                <div className="mb-6 relative">
                  <input
                    type="text"
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    placeholder="Module"
                    className="w-full p-3 border border-gray-300 rounded-full mb-4"
                  />
                  <select
                    value={newDeveloper}
                    onChange={(e) => setNewDeveloper(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-full mb-4"
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
                  <input
                    type="date"
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-full mb-4"
                  />
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-full mb-4"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm"
                    onClick={isEditing ? saveEditModule : addModule}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Modulist;
