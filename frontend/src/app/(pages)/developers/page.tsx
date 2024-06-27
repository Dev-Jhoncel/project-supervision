"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";

interface Developer {
  name: string;
  department: string;
  project: number;
  status: string;
  ratings: number;
  profilePicture: string;
}

const initialDevelopersData: Developer[] = [
  {
    name: "Christine Mae Ocana",
    department: "ML Wallet - Backend",
    project: 7,
    status: "Vacant",
    ratings: 5,
    profilePicture: "cprofile.jpg",
  },
  {
    name: "Francis Cutamora",
    department: "ML Wallet - Backend",
    project: 10,
    status: "Vacant",
    ratings: 5,
    profilePicture: "fprofile.jpg",
  },
  {
    name: "Jovie Jurac",
    department: "ML Wallet - Backend",
    project: 9,
    status: "Busy",
    ratings: 4,
    profilePicture: "jprofile.jpg",
  },
];

const DeveloperTable: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>(
    initialDevelopersData
  );
  const [newDeveloper, setNewDeveloper] = useState<Developer>({
    name: "",
    department: "",
    project: 0,
    status: "Vacant",
    ratings: 0,
    profilePicture: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedDevelopers = [...developers];
    updatedDevelopers[index].status = newStatus;
    setDevelopers(updatedDevelopers);
  };

  const handleAddDeveloper = () => {
    setDevelopers([...developers, newDeveloper]);
    setNewDeveloper({
      name: "",
      department: "",
      project: 0,
      status: "Vacant",
      ratings: 0,
      profilePicture: "",
    });
  };

  const handleEditDeveloper = (index: number) => {
    setNewDeveloper(developers[index]);
    setEditingIndex(index);
  };

  const handleUpdateDeveloper = () => {
    if (editingIndex !== null) {
      const updatedDevelopers = [...developers];
      updatedDevelopers[editingIndex] = newDeveloper;
      setDevelopers(updatedDevelopers);
      setEditingIndex(null);
      setNewDeveloper({
        name: "",
        department: "",
        project: 0,
        status: "Vacant",
        ratings: 0,
        profilePicture: "",
      });
    }
  };

  const handleDeleteDeveloper = (index: number) => {
    const updatedDevelopers = developers.filter((_, i) => i !== index);
    setDevelopers(updatedDevelopers);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDeveloper({ ...newDeveloper, [name]: value });
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col gap-8">
        <div>
          <h1 className="font-bold text-2xl">Developers</h1>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2 ">
            {editingIndex !== null ? "Edit Developer" : "Add New Developer"}
          </h2>
          <div className="flex gap-2 ">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newDeveloper.name}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded border-red-900"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newDeveloper.department}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded border-red-900"
            />
            <input
              type="number"
              name="project"
              placeholder="Project"
              value={newDeveloper.project}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded border-red-900"
            />
            <select
              name="status"
              value={newDeveloper.status}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded border-red-900"
            >
              <option value="Vacant">Vacant</option>
              <option value="Busy">Busy</option>
            </select>
            <input
              type="number"
              name="ratings"
              placeholder="Ratings"
              value={newDeveloper.ratings}
              onChange={handleInputChange}
              className="border px-4 py-2 rounded border-red-900"
              max={5}
              min={0}
            />
            <button
              onClick={
                editingIndex !== null
                  ? handleUpdateDeveloper
                  : handleAddDeveloper
              }
              className="bg-green-900 text-white px-4 py-2 rounded"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-xl text-left">
          <thead>
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Department</th>
              <th className="py-2 px-4">Project</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ratings</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {developers.map((dev, index) => (
              <tr key={index}>
                <td className="py-8 px-4 border-b border-dashed">
                  <div className="flex items-center gap-2">
                    <img
                      src={dev.profilePicture}
                      alt={`${dev.name}'s profile`}
                      className="w-6 h-6 rounded-full object-cover border-2 border-gray-300"
                    />
                    <span>{dev.name}</span>
                  </div>
                </td>
                <td className="py-8 px-4 border-b border-dashed">
                  {dev.department}
                </td>
                <td className="py-8 px-4 border-b border-dashed">
                  {dev.project}
                </td>
                <td className="text-sm py-8 px-4 border-b border-dashed">
                  <select
                    className={`pr-4 py-2 rounded ${
                      dev.status === "Vacant"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    value={dev.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Vacant">Vacant</option>
                    <option value="Busy">Busy</option>
                  </select>
                </td>
                <td className="text-yellow-500 py-8 px-4 border-b border-dashed">
                  {"★".repeat(dev.ratings)}
                  {"☆".repeat(5 - dev.ratings)}
                </td>
                <td className="py-8 px-4 border-b border-dashed">
                  <button
                    onClick={() => handleEditDeveloper(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDeveloper(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DeveloperTable;
