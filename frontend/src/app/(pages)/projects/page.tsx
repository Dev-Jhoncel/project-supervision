"use client";
import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "@/components/generalModal/Modal";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { addProjects } from "@/utils/ProjectsFunc/AddNewProject";
import toast from "react-hot-toast";
import { selectProjects } from "@/utils/ProjectsFunc/SelectProjects";
import { selectStatusEnum } from "@/utils/StatusEnumFunc/SelectStatus";
import { editProject } from "@/utils/ProjectsFunc/EditProject";
import { EditParams } from "@/interfaces/IEditProjectParams";
import { deleteProject } from "@/utils/ProjectsFunc/DeleteProject";
import { updateStatus } from "@/utils/ProjectsFunc/UpdateStatus";
import { getUserDetails } from "@/utils/UserDetailsFunc/UserDetails";
import { UserDetails } from "@/interfaces/IUserDetails";
import { Toast } from "react-toastify/dist/components";
import Loader from "@/components/loader/Loader";

interface Project {
  id: number;
  project: string;
  due: string;
  status: "Ongoing" | "Delay" | "Completed" | "At Risk";
}
interface SelectedProjects {
  id: number;
  project: string;
  due_date: Date;
  status: string;
}

const initialProjects: Project[] = [];

const statusOptions: ("Ongoing" | "Delay" | "Completed" | "At Risk")[] = [
  "Ongoing",
  "Delay",
  "Completed",
  "At Risk",
];

const ProjectCard: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: number]: string | undefined;
  }>({});
  const [isAddProject, setAddProject] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newProject, setNewProject] = useState<string>("");
  const [currentUserId, setCurrentUserID] = useState(0);
  const [newDueDate, setNewDueDate] = useState<string>("");
  const [newProjectId, setNewProjectId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newStatus, setNewStatus] = useState<
    "Ongoing" | "Delay" | "Completed" | "At Risk"
  >("Ongoing");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const router = useRouter();

  const handleStatusChange = async (index: number, status: string) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [index]: status,
    }));

    console.log(projects[index]);
    console.log(status);
    const project = projects[index];
    const data = {
      id: project.id,
      status: status,
    };
    if (project.id !== 0) {
      const result = await updateStatus(data);
      result.code === "SUCCESS"
        ? toast.success("Successfully Updated Status")
        : toast.error("Unable to update status");
    }
  };

  const handleCancelEdit = () => {
    setIsOpenModal(false);
    setNewProjectId(0);
    setNewProject("");
    setNewDueDate("");
    setNewStatus("Ongoing");
    setEditIndex(null);
  };

  const handleAddProjectModal = () => {
    setAddProject(true);
    setIsOpenModal(true);
    setEditIndex(null);
  };

  const handleEditProjectModal = (index: number) => {
    setAddProject(false);
    const project = projects[index];
    setNewProjectId(project.id);
    console.log(project.id);
    setNewProject(project.project);
    setNewDueDate(project.due);
    setNewStatus(project.status);
    setEditIndex(index);
    setIsOpenModal(true);
  };

  enum statusEnum {
    Ongoing = "Ongoing",
    Delay = "Delay",
    Completed = "Completed",
    AtRisk = "At Risk",
  }

  //Get User Info
  useEffect(() => {
    const fetchSelctedProjects = async () => {
      const decodeToken = getUserDetails();
      setCurrentUserID(decodeToken?.id);
      console.log(decodeToken?.id);
      const data = await selectProjects(decodeToken?.id);
      const ArrayList: Project[] = [];
      data.map((m: SelectedProjects) => {
        const formattedProject = {
          id: m.id,
          project: m.project,
          due: `${m.due_date}`,
          status: selectStatusEnum(m.status.trim()),
        };
        ArrayList.push(formattedProject);
        setProjects(() => []);
        setProjects(ArrayList);
      });
    };
    fetchSelctedProjects();
  }, []);

  const handleSaveProject = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(newProject);
    console.log(newDueDate);
    console.log(currentUserId);
    if (newProject && newDueDate && currentUserId) {
      const newProjectObj: Project = {
        id: newProjectId,
        project: newProject,
        due: newDueDate,
        status: newStatus,
      };

      const edit_params: EditParams = {
        id: newProjectObj.id,
        project: newProjectObj.project,
        due_date: new Date(newProjectObj.due),
        status: newProjectObj.status,
      };

      if (!isLoading) {
        setIsLoading(true);
        try {
          //Request to Add New Project
          if (isAddProject) {
            if (
              newDueDate !== null &&
              currentUserId !== 0 &&
              newStatus !== null &&
              newProject !== null
            ) {
              const result = await addProjects(
                newProject,
                currentUserId,
                new Date(newDueDate),
                newStatus
              );
              if (result.code === "SUCCESS") {
                toast.success("Success added new project");
              } else {
                console.log(result);
                toast.error("Unable to add new project");
              }
            }
          }
          if (!isAddProject) {
            const editResult = await editProject(edit_params);
            console.log(editResult);
            editResult.code !== "SUCCESS"
              ? toast.error(editResult.message)
              : toast.success("Successfully edited project");
          }
        } catch (error) {
          console.error(error);
          toast.error(error);
        } finally {
          setIsLoading(false);
        }
      }

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

  const handleDeleteProject = async (e: React.FormEvent, index: number) => {
    e.preventDefault();

    const project = projects[index];
    if (!isButtonDisabled) {
      if (project.id !== 0) {
        const removeStatus = await deleteProject(project.id);
        console.log(`status: ${removeStatus}`);
        removeStatus.code !== "SUCCESS"
          ? toast.error("Unable to delete records")
          : toast.success("Successfully deleted project");
      }
      setProjects(projects.filter((_, i) => i !== index));
      setIsButtonDisabled(true);
    }
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

  return isLoading ? (
    <div>
      <Loader />
    </div>
  ) : (
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
                  <td className="text-sm py-4" key={project.id}>
                    {project.due}
                  </td>
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
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(e, index)}
                      disabled={isButtonDisabled}
                      className=" text-red-700 px-4 py-2 rounded"
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
