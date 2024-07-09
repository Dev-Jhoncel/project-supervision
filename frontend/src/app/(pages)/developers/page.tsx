"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Modal from "@/components/generalModal/Modal";
import Profile from "@/components/profiledeveloper/Profile";

interface Developer {
  name: string;
  department: string;
  project: number;
  status: string;
  ratings: number;
  profilePicture: string;
  email: string;
  phone: string;
  skills: string[];
  projects: { name: string; status: string }[];
}

const initialDevelopersData: Developer[] = [
  {
    name: "Christine Mae Ocana",
    department: "ML Wallet - Backend",
    project: 7,
    status: "Vacant",
    ratings: 5,
    profilePicture: "cprofile.jpg",
    email: "christine@example.com",
    phone: "123-456-7890",
    skills: ["Java", "Spring Boot", "SQL"],
    projects: [
      { name: "Project A", status: "Done" },
      { name: "Project B", status: "Ongoing" },
    ],
  },
  {
    name: "Francis Cutamora",
    department: "ML Wallet - Backend",
    project: 10,
    status: "Vacant",
    ratings: 5,
    profilePicture: "fprofile.jpg",
    email: "francis@example.com",
    phone: "123-456-7890",
    skills: ["Node.js", "Express", "MongoDB"],
    projects: [
      { name: "Project C", status: "Done" },
      { name: "Project D", status: "Ongoing" },
    ],
  },
  {
    name: "Jovie Jurac",
    department: "ML Wallet - Backend",
    project: 9,
    status: "Busy",
    ratings: 4,
    profilePicture: "jprofile.jpg",
    email: "jovie@example.com",
    phone: "123-456-7890",
    skills: ["React", "Redux", "TypeScript"],
    projects: [
      { name: "Project E", status: "Done" },
      { name: "Project F", status: "Ongoing" },
    ],
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
    email: "",
    phone: "",
    skills: [],
    projects: [],
  });
  const [isOpenModal, setIsOpenModal] = useState(false); // State for modal
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(
    null
  );
  const [isRatingExceededModalOpen, setIsRatingExceededModalOpen] =
    useState(false); // State for rating exceeded modal

  // State for selected developer

  const router = useRouter();

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedDevelopers = [...developers];
    updatedDevelopers[index].status = newStatus;
    setDevelopers(updatedDevelopers);
  };

  const handleAddDeveloper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedDevelopers = [...developers];
      updatedDevelopers[editingIndex] = editDeveloper;
      setDevelopers(updatedDevelopers);
      setEditingIndex(null);
    } else {
      if (editDeveloper.ratings > 5) {
        setIsRatingExceededModalOpen(true);
        return;
      }
      setDevelopers([...developers, editDeveloper]);
    }
    setEditDeveloper({
      name: "",
      department: "",
      project: 0,
      status: "Vacant",
      ratings: 0,
      profilePicture: "",
      email: "",
      phone: "",
      skills: [],
      projects: [],
    });
    setIsOpenModal(false); // Close modal after adding/editing developer
  };

  const handleEditDeveloper = (index: number) => {
    setEditDeveloper(developers[index]);
    setEditingIndex(index);
    setIsOpenModal(true); // Open modal for editing developer
  };

  const handleDeleteDeveloper = (index: number) => {
    const updatedDevelopers = developers.filter((_, i) => i !== index);
    setDevelopers(updatedDevelopers);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Check if the name is 'ratings' and the value is greater than 5
    if (name === "ratings" && parseInt(value) > 5) {
      // Show modal alert
      setIsRatingExceededModalOpen(true); // State to control the modal
      // Optionally, you can reset the value or handle it as per your app's logic
      setEditDeveloper({ ...editDeveloper, [name]: 5 }); // Set it to 5 or handle accordingly
    } else {
      // Otherwise, update the state normally
      setEditDeveloper({ ...editDeveloper, [name]: value });
    }
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
      email: "",
      phone: "",
      skills: [],
      projects: [],
    });
    setIsOpenModal(false); // Close modal on cancel edit
  };

  const handleAddDeveloperModal = () => {
    setEditingIndex(null);
    setEditDeveloper({
      name: "",
      department: "",
      project: 0,
      status: "Vacant",
      ratings: 0,
      profilePicture: "",
      email: "",
      phone: "",
      skills: [],
      projects: [],
    });
    setIsOpenModal(true); // Open modal for adding a new developer
  };
  const handleDeveloperClick = (dev: Developer) => {
    setSelectedDeveloper(dev);
  };

  const closeProfileModal = () => {
    setSelectedDeveloper(null);
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col gap-8">
        <div className="flex justify-between items-center mb-15 ">
          <h1 className="font-bold text-2xl">Developers</h1>
        </div>
        <div className="ml-auto">
          <button
            onClick={handleAddDeveloperModal}
            className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black"
          >
            <div className="border border-green-900 bg-green-900 rounded-full p-1">
              <FaPlus className="text-white" />
            </div>
            Add Developer
          </button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-xl text-left mt-9">
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
                  <div
                    className="text-sm flex items-center gap-2 cursor-pointer"
                    onClick={() => handleDeveloperClick(dev)}
                  >
                    <img
                      src={dev.profilePicture}
                      alt={`${dev.name}'s profile`}
                      className="w-6 h-6 rounded-full object-cover border-2 border-gray-300"
                    />
                    <span>{dev.name}</span>
                  </div>
                </td>
                <td className="text-sm py-8 px-4 border-b border-dashed cursor-pointer hover-font-bold">
                  {dev.department}
                </td>
                <td className="text-sm py-8 px-4 border-b border-dashed">
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
                <td className="text-sm text-yellow-500 py-8 px-4 border-b border-dashed">
                  {"★".repeat(dev.ratings)}
                  {"☆".repeat(5 - dev.ratings)}
                </td>
                <td className="py-8 px-4 border-b border-dashed">
                  <button
                    onClick={() => handleEditDeveloper(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
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
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={isOpenModal} onClose={handleCancelEdit}>
          <div className="mt-7 ml-11 h-full">
            <div className=" shadow-lg border bg-gradient-to-tl rounded-2xl w-full h-full -mt-9 -ml-9 border-t-4 border-t-red-900">
              <h1 className="text-xl mb-4 ml-2 mt-2 text-center font-bold">
                {editingIndex !== null ? "Edit Developer" : "Add Developer"}
              </h1>
              <form onSubmit={handleAddDeveloper}>
                <div className="mb-4 ml-4 ">
                  <label className="block text-sm font-bold mb-2 mt-6">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editDeveloper.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded-full w-80 shadow-xl"
                  />
                </div>
                <div className="mb-4 ml-4">
                  <label className="block text-sm font-bold mb-2 mt-6">
                    Department:
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={editDeveloper.department}
                    onChange={handleInputChange}
                    className="border p-2 rounded-full w-80 shadow-xl"
                  />
                </div>
                <div className="mb-4 ml-4 ">
                  <label className="block text-sm font-bold mb-2 mt-6">
                    Project:
                  </label>
                  <input
                    type="number"
                    name="project"
                    placeholder="Project"
                    value={editDeveloper.project}
                    onChange={handleInputChange}
                    className="border p-2 rounded-full w-80 shadow-xl"
                  />
                </div>
                <div className="mb-4 ml-4 ">
                  <label className="block text-sm font-bold mb-2 mt-6">
                    Status:
                  </label>
                  <select
                    className={`pr-2 py-1 rounded-full ml-20 ${
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
                </div>
                <div className="mb-4 ml-4">
                  <label className="block text-sm font-bold mb-2 mt-6">
                    Ratings:
                  </label>
                  <input
                    type="number"
                    name="ratings"
                    placeholder="Ratings"
                    value={editDeveloper.ratings}
                    onChange={handleInputChange}
                    className="border p-1 rounded-full w-80"
                  />
                </div>
                <div className="flex justify-end p-6 gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm "
                  >
                    {editingIndex !== null ? "Save" : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-2 rounded-full mr-9 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        <Modal isOpen={selectedDeveloper !== null} onClose={closeProfileModal}>
          {selectedDeveloper && (
            <Profile
              developer={selectedDeveloper}
              onClose={closeProfileModal}
            />
          )}
        </Modal>

        <Modal
          isOpen={isRatingExceededModalOpen}
          onClose={() => setIsRatingExceededModalOpen(false)}
        >
          <div className="p-6 w-96">
            <h1 className="text-xl font-bold mb-4 text-red-900">
              Oops! 5 stars only
            </h1>
            <p className="text-sm">Please enter a rating between 0 to 5.</p>
            <button
              onClick={() => setIsRatingExceededModalOpen(false)}
              className="bg-green-500 text-white px-4 py-2 rounded-full mt-4"
            >
              OK
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default DeveloperTable;
