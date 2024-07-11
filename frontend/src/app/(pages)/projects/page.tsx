"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "@/components/generalModal/Modal";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface Project {
  project: string;
  due: string;
  status: "Ongoing" | "Delay" | "Completed" | "At Risk";
}

const initialProjects: Project[] = [
  {
    project: "ML Kwarta Padala",
    due: "Jun 20, 2024",
    status: "Ongoing",
  },
  {
    project: "ML Shop",
    due: "Jun 20, 2024",
    status: "Delay",
  },
  {
    project: "ML Wallet",
    due: "Jun 21, 2024",
    status: "Completed",
  },
  {
    project: "ML Kyuties",
    due: "Jun 19, 2024",
    status: "At Risk",
  },
];

const statusOptions: ("Ongoing" | "Delay" | "Completed" | "At Risk")[] = [
  "Ongoing",
  "Delay",
  "Completed",
  "At Risk",
];

const ProjectCard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: number]: string | undefined;
  }>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newProject, setNewProject] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>("");
  const [newStatus, setNewStatus] = useState<
    "Ongoing" | "Delay" | "Completed" | "At Risk"
  >("Ongoing");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const router = useRouter();

  const handleStatusChange = (index: number, status: string) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [index]: status,
    }));
  };

  const handleCancelEdit = () => {
    setIsOpenModal(false);
    setNewProject("");
    setNewDueDate("");
    setNewStatus("Ongoing");
    setEditIndex(null);
  };

  const handleAddProjectModal = () => {
    setIsOpenModal(true);
    setEditIndex(null);
  };

  const handleEditProjectModal = (index: number) => {
    const project = projects[index];
    setNewProject(project.project);
    setNewDueDate(project.due);
    setNewStatus(project.status);
    setEditIndex(index);
    setIsOpenModal(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject && newDueDate) {
      const newProjectObj: Project = {
        project: newProject,
        due: newDueDate,
        status: newStatus,
      };
      if (editIndex !== null) {
        const updatedProjects = [...projects];
        updatedProjects[editIndex] = newProjectObj;
        setProjects(updatedProjects);
      } else {
        setProjects([...projects, newProjectObj]);
      }
      handleCancelEdit();
    }
  };

  const handleDeleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
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

  const handleProjectClicked = () => {
    router.push("/modules");
  };

  return (
    <div className="p-6 flex flex-col gap-9">
      <div>
        <h1 className="font-bold text-2xl">Projects</h1>
      </div>
      <div className="flex items-center justify-between gap-96">
        <div className="ml-auto">
          <button
            className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
            onClick={handleAddProjectModal}
          >
            <div className="border border-green-900 bg-green-900 rounded-full">
              <FaPlus className="text-white" />
            </div>
            Create new project
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="ml-18 min-w-full bg-white shadow-lg rounded-xl text-left border-dashed">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Project
              </th>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Due
              </th>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-400 text-left border-dashed">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => {
              const currentStatus = selectedStatus[index] || project.status;
              return (
                <tr
                  key={index}
                  className="hover:font-semibold cursor-pointer border-b border-gray-300 border-dashed my-2"
                >
                  <td
                    className="text-sm relative py-10"
                    onClick={handleProjectClicked}
                  >
                    {project.project}
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
                  <td className="py-8 px-4 border-b border-dashed">
                    <button
                      onClick={() => handleEditProjectModal(index)}
                      className=" text-yellow-700  rounded mr-2"
                    >
                      <FaEdit className="hover:text-yellow-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className=" text-red-700 px-4 py-2 rounded"
                    >
                      <FaTrash className="hover:text-500" />
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
              {editIndex !== null ? "Edit Project" : "Create New Project"}
            </h2>
            <form onSubmit={handleSaveProject}>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full drop-shadow-xl"
                />
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  placeholder="Due Date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-full drop-shadow-xl"
                />
              </div>
              <div className="mb-6">
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(
                      e.target.value as
                        | "Ongoing"
                        | "Delay"
                        | "Completed"
                        | "At Risk"
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-full drop-shadow-xl"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end p-4 gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-full text-sm ml-2"
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
