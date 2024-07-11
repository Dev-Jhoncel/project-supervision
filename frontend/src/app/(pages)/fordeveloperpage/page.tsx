"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

import { IoCloseOutline } from "react-icons/io5";

type DeveloperTask = {
  id: number;
  title: string;
  status: "Backlog" | "In Progress" | "Completed";
};

const DeveloperView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState<DeveloperTask[]>([
    { id: 1, title: "Check the user dashboard", status: "Backlog" },
    { id: 2, title: "Lorem lorem lorem", status: "In Progress" },
  ]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const lastIndex = currentPage * tasksPerPage;
  const firstIndex = lastIndex - tasksPerPage;
  const currentTasks = tasks.slice(firstIndex, lastIndex);

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditTaskId(taskId);
      setEditedTitle(taskToEdit.title);
      setIsEditModalOpen(true);
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
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleStatusChange = (
    taskId: number,
    newStatus: DeveloperTask["status"]
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewTask = () => {
    const newTask: DeveloperTask = {
      id: tasks.length + 1, // You might want to use a better way to generate unique IDs
      title: newTaskTitle,
      status: "Backlog",
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle(""); // Clear the input field
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <div className="fixed top-0 bg-red-900 w-full h-48 flex items-center shadow-md mb-10">
        <div className="ml-6 mt-10">
          <Image
            src="/projectSupervision.png"
            alt="logo"
            width={250}
            height={250}
          />
        </div>
        <div className="ml-1">
          <h1 className="text-white text-2xl font-semibold mt-4">
            Project Supervision
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-56 ml-6">
        <div className="ml-auto mr-10">
          <button
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
            onClick={handleAddTask}
          >
            <div className="bg-green-900 rounded-full p-1">
              <FaPlus className="text-white" />
            </div>
            Create new task
          </button>
        </div>
      </div>

      <div className="sticky mt-20 mx-12 max-h-1/2 overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-base font-bold text-gray-500 border-r border-gray-300">
                Task
              </th>
              <th className="px-6 py-3 text-left text-base font-bold text-gray-500 border-r border-gray-300">
                Status
              </th>
              <th className="px-6 py-3 text-left text-base font-bold text-gray-500 border-r border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white ">
            {currentTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap border border-r-gray-300">
                  <div className="flex items-center space-x-3">
                    {editTaskId === task.id ? (
                      <input
                        type="text"
                        className="border border-r-gray-300 rounded-md px-2 py-1 w-full"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                    ) : (
                      <span className="text-sm">{task.title}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-r-gray-300">
                  <div className="flex items-center space-x-2">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task.id,
                          e.target.value as DeveloperTask["status"]
                        )
                      }
                      className={`py-1 px-2 rounded-lg text-sm ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      <option value="Backlog">Backlog</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap space-x-5">
                  <button
                    className="text-yellow-600 hover:text-yellow-900"
                    onClick={() => handleEditTask(task.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-700 hover:text-red-900"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-50 ">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-2 mx-1 text-xs bg-gray-200 text-gray-600 rounded-md "
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(tasks.length / tasksPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 bg-gray-200 text-xs text-gray-600 rounded-md ${
                currentPage === index + 1 ? "bg-gray-400" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentTasks.length < tasksPerPage}
          className="px-4 py-2 mx-1 text-xs bg-gray-200 text-gray-600 rounded-md"
        >
          Next
        </button>
      </div>

      {/* Modal for adding new task */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white p-12 rounded-lg z-50 shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-black">Add New Task</h2>
              <button
                className="font-bold text-xl text-black-500 hover:text-gray-500"
                onClick={() => setIsAddModalOpen(false)}
              >
                <IoCloseOutline />
              </button>
            </div>
            <div>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-5 py-7 w-full"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500 mr-2"
                onClick={handleSaveNewTask}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing task */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white p-12 rounded-lg z-50 shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-900">Edit Task</h2>
              <button
                className="font-bold text-xl text-black-500 hover:text-gray-500"
                onClick={() => setIsEditModalOpen(false)}
              >
                <IoCloseOutline />
              </button>
            </div>
            <div>
              <input
                type="text"
                id="editTaskTitle"
                className="border border-gray-300 rounded-md px-5 py-7 w-full"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500 mr-2"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperView;
