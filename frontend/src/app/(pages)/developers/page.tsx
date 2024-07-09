"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editDeveloper, setEditDeveloper] = useState<Developer>({
    name: "",
    department: "",
    project: 0,
    status: "Vacant",
    ratings: 0,
    profilePicture: "",
  });
  const router = useRouter();

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedDevelopers = [...developers];
    updatedDevelopers[index].status = newStatus;
    setDevelopers(updatedDevelopers);
  };

  const handleAddDeveloper = () => {
    if (editingIndex !== null) {
      const updatedDevelopers = [...developers];
      updatedDevelopers[editingIndex] = editDeveloper;
      setDevelopers(updatedDevelopers);
      setEditingIndex(null);
    } else {
      setDevelopers([...developers, editDeveloper]);
    }
    setEditDeveloper({
      name: "",
      department: "",
      project: 0,
      status: "Vacant",
      ratings: 0,
      profilePicture: "",
    });
  };

  const handleEditDeveloper = (index: number) => {
    setEditDeveloper(developers[index]);
    setEditingIndex(index);
  };

  const handleSaveEdit = (index: number) => {
    const updatedDevelopers = [...developers];
    updatedDevelopers[index] = editDeveloper;
    setDevelopers(updatedDevelopers);
    setEditingIndex(null);
  };

  const handleDeleteDeveloper = (index: number) => {
    const updatedDevelopers = developers.filter((_, i) => i !== index);
    setDevelopers(updatedDevelopers);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditDeveloper({ ...editDeveloper, [name]: value });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditDeveloper({
      name: "",
      department: "",
      project: 0,
      status: "Vacant",
      ratings: 0,
      profilePicture: "",
    });
  };

  const handleDeveloperModals = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    router.push("/developermodals");
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col gap-8">
        <div>
          <h1 className="font-bold text-2xl">Developers</h1>
        </div>
        <div className="ml-auto">
          <button
            onClick={handleDeveloperModals}
            className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
          >
            <div className="border border-green-900 bg-green-900 rounded-full">
              <FaPlus className="text-white" />
            </div>
            Add Developer
          </button>
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
                {editingIndex === index ? (
                  <>
                    <td className="py-8 px-4 border-b border-dashed">
                      <input
                        type="text"
                        name="name"
                        value={editDeveloper.name}
                        onChange={handleInputChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="py-8 px-4 border-b border-dashed">
                      <input
                        type="text"
                        name="department"
                        value={editDeveloper.department}
                        onChange={handleInputChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="py-8 px-4 border-b border-dashed">
                      <input
                        type="number"
                        name="project"
                        value={editDeveloper.project}
                        onChange={handleInputChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="text-sm py-8 px-4 border-b border-dashed">
                      <select
                        className={`pr-4 py-2 rounded ${
                          editDeveloper.status === "Vacant"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        name="status"
                        value={editDeveloper.status}
                        onChange={handleInputChange}
                      >
                        <option value="Vacant">Vacant</option>
                        <option value="Busy">Busy</option>
                      </select>
                    </td>
                    <td className="text-yellow-500 py-8 px-4 border-b border-dashed">
                      <input
                        type="number"
                        name="ratings"
                        value={editDeveloper.ratings}
                        onChange={handleInputChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="py-8 px-4 border-b border-dashed">
                      <button
                        onClick={() => handleSaveEdit(index)}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-xl hover:text-2xl text-red-900"
                      >
                        <MdOutlineCancel />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-8 px-4 border-b border-dashed">
                      <div className="text-sm flex items-center gap-2">
                        <Image
                          width={60}
                          height={60}
                          src="../../../../public/profile.png"
                          alt="My Image"
                          priority
                        />
                        <span>{dev.name}</span>
                      </div>
                    </td>
                    <td className=" text-sm py-8 px-4 border-b border-dashed cursor-pointer hover-font-bold">
                      {dev.department}
                    </td>
                    <td className=" text-sm py-8 px-4 border-b border-dashed">
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
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                      >
                        <option value="Vacant">Vacant</option>
                        <option value="Busy">Busy</option>
                      </select>
                    </td>
                    <td className="text-sm text-yellow-500 py-8 px-4 border-b border-dashed">
                      {"★".repeat(dev.ratings)}
                      {"☆".repeat(5 - dev.ratings)}
                    </td>
                    <td className="py-8 px-4 border-b border-dashed">
                      <button
                        onClick={() => handleEditDeveloper(index)}
                        className=" text -sm bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteDeveloper(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DeveloperTable;
