"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { FaPlus, FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/generalModal/Modal";
import Button from "@/components/buttons/button";

type Task = {
  id: number;
  title: string;
  level: "High" | "Medium" | "Low";
  status: "Done" | "Review";
};

const initialTasks: Task[] = [
  { id: 1, title: "Check the user dashboard", level: "High", status: "Done" },
  { id: 2, title: "Lorem lorem lorem", level: "Medium", status: "Review" },
  { id: 3, title: "Landing Page Lorem", level: "Medium", status: "Done" },
  {
    id: 4,
    title: "Lorem lorem lorem lorem lorem lorem lorem lorem",
    level: "Low",
    status: "Review",
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterStatus, setFilterStatus] = useState<"All" | "Done" | "Review">(
    "All"
  );
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCheckboxChange = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "Done" ? "Review" : "Done",
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleFilter = (status: "All" | "Done" | "Review") => {
    setFilterStatus(status);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit && taskToEdit.status !== "Done") {
      setEditTaskId(taskId);
      setEditedTitle(taskToEdit.title);
    }
  };

  const handleSaveEdit = () => {
    if (editTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, title: editedTitle } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditedTitle("");
    }
  };

  const getColorByLevel = (level: "High" | "Medium" | "Low") => {
    switch (level) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  const filteredTasks =
    filterStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  return (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <h1 className="font-bold text-2xl">Tasks</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-8">Today's Tasks</h2>
          <div className="ml-auto">
            <button
              onClick={() => setIsOpenModal(true)}
              className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
            >
              <div className="border border-green-900 bg-green-900 rounded-full">
                <FaPlus className="text-white" />
              </div>
              Create new task
            </button>
          </div>
        </div>
        <div className="flex justify-items-start mb-4">
          <button
            onClick={() => handleFilter("All")}
            className={`border-b-2 ${
              filterStatus === "All" ? "border-blue-500" : ""
            } pb-1 text-sm hover:text-blue-900 cursor-pointer`}
          >
            All{" "}
            <span
              className={`hover:text-green-900 cursor-pointer ${
                filterStatus === "All" ? "bg-blue-100" : ""
              }`}
            >
              {tasks.length}
            </span>
          </button>
          <button
            onClick={() => handleFilter("Done")}
            className={`ml-4 text-sm ${
              filterStatus === "Done" ? "text-blue-900" : ""
            } hover:text-blue-900 cursor-pointer`}
          >
            Done
            <span
              className={`hover:text-blue-900 cursor-pointer ${
                filterStatus === "Done" ? "bg-green-100" : ""
              }`}
            >
              {tasks.filter((task) => task.status === "Done").length}
            </span>
          </button>
          <button
            onClick={() => handleFilter("Review")}
            className={`ml-4 text-sm ${
              filterStatus === "Review" ? "text-blue-900" : ""
            } hover:text-blue-900 cursor-pointer`}
          >
            Review
            <span
              className={`hover:text-blue-900 cursor-pointer ${
                filterStatus === "Review" ? "bg-red-100" : ""
              }`}
            >
              {tasks.filter((task) => task.status === "Review").length}
            </span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={task.status === "Done"}
                        onChange={() => handleCheckboxChange(task.id)}
                      />
                      {editTaskId === task.id ? (
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md px-2 py-1"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        <span className="text-sm">{task.title}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getColorByLevel(
                          task.level
                        )}`}
                      >
                        {task.level}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`${
                        task.status === "Done"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } py-1 px-2 rounded-lg text-sm`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      {editTaskId === task.id ? (
                        <button
                          className="hover:text-blue-500"
                          onClick={handleSaveEdit}
                        >
                          <FaCheck />
                        </button>
                      ) : (
                        <button
                          className={`hover:text-blue-900 ${
                            task.status === "Done"
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          onClick={() => handleEditTask(task.id)}
                          disabled={task.status === "Done"}
                        >
                          <CiEdit />
                        </button>
                      )}
                      <button
                        className="hover:text-red-900"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 border-t-4 border-red-900 h-auto">
            <h2 className="flex justify-center text-xl font-bold mb-6 items-center">
              Create New Task
            </h2>
            <form>
              <div className="mb-10">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="w-full p-2 border border-gray-300 rounded-full drop-shadow-xl"
                />
              </div>
              <div className="mb-10 relative">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 pr-10 border border-gray-300 rounded-full drop-shadow-xl"
                />
              </div>
              <div className="flex justify-between mb-4">
                <div className="w-1/2 pr-2">
                  <input
                    type="date"
                    placeholder="Due"
                    className="w-full p-2 border border-gray-300 rounded-full drop-shadow-xl"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <select className="w-full p-2 border border-gray-300 rounded-full drop-shadow-xl">
                    <option value="" disabled selected hidden>
                      Level
                    </option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <Button title="Add" />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const TaskPage: React.FC = () => {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
};

export default TaskPage;
