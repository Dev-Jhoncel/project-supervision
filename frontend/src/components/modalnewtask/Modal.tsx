"use client";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

const ModalButton: React.FC<{ title: string }> = ({ title }) => {
  return (
    <button
      type="submit"
      className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4"
    >
      {title}
    </button>
  );
};

const CreateProject: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
          <ModalButton title="Add" />
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
