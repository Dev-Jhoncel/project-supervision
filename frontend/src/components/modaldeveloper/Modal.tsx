"use client";
import React from "react";

const ModalButton: React.FC<{ title: string }> = ({ title }) => {
  return (
    <button className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
      {title}
    </button>
  );
};

const AddDeveloperForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 border-t-4 border-red-900 h-96">
        <h2 className="text-xl font-bold mb-6">Add New Developer</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-900"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Department"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-900"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Project"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-900"
            />
          </div>
          <div className="mb-4 flex justify-between">
            <select className="w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-900 text-gray-500">
              <option value="" disabled selected>
                Status
              </option>
              <option>Vacant</option>
              <option>Busy</option>
            </select>
            <select className="w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-900 text-gray-500">
              <option value="" disabled selected>
                Ratings
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <ModalButton title="Add" />
        </form>
      </div>
    </div>
  );
};

export default AddDeveloperForm;
