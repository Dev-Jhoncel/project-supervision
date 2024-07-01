"use client";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

const ModalButton: React.FC<{ title: string }> = ({ title }) => {
  return (
    <button className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
      {title}
    </button>
  );
};

const CreateProject: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
          <ModalButton title="Add" />
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
