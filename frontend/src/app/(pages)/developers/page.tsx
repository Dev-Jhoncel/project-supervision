"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Modal from "@/components/generalModal/Modal";
import Profile from "@/components/profiledeveloper/Profile";
import Loader from "@/components/loader/Loader";
import { getTopDevelopers } from "@/utils/DeveloperFunc/SelectTopDev";
import { DeveloperDetails } from "@/interfaces/IDeveloperDetails";
import { selectUniqueProjects } from "@/utils/ProjectsFunc/SpecificProject";
import { updateDeveloperDetails } from "@/utils/DeveloperFunc/UpdateDeveoperDwetails";
import { EditParams } from "@/interfaces/IEditDeveloperParams";
import { addDevelopers } from "@/utils/DeveloperFunc/AddDeveloper";
import { deleteDevelopers } from "@/utils/DeveloperFunc/DeleteDeveloper";
import toast from "react-hot-toast";

interface Developer {
  id: number;
  name: string;
  department: string;
  project: number;
  status: string;
  ratings: number;
  profilePicture: string;
  email: string;
  phone: string;
  skills: string[];
  projects?: { name: string; status: string }[];
}

const profilePic = ["cprofile.jpg", "fprofile.jpg", "jprofile.jpg"];
const randomIndex = Math.floor(Math.random() * profilePic.length);

const initialDevelopersData: Developer[] = [
  // {
  //   id: 1,
  //   name: "Christine Mae Ocana",
  //   department: "ML Wallet - Backend",
  //   project: 7,
  //   status: "Vacant",
  //   ratings: 5,
  //   profilePicture: "cprofile.jpg",
  //   email: "christine@example.com",
  //   phone: "123-456-7890",
  //   skills: ["Java", "Spring Boot", "SQL"],
  //   projects: [
  //     { name: "Project A", status: "Done" },
  //     { name: "Project B", status: "Ongoing" },
  //   ],
  // },
  // {
  //   id: 2,
  //   name: "Francis Cutamora",
  //   department: "ML Wallet - Backend",
  //   project: 10,
  //   status: "Vacant",
  //   ratings: 5,
  //   profilePicture: "fprofile.jpg",
  //   email: "francis@example.com",
  //   phone: "123-456-7890",
  //   skills: ["Node.js", "Express", "MongoDB"],
  //   projects: [
  //     { name: "Project C", status: "Done" },
  //     { name: "Project D", status: "Ongoing" },
  //   ],
  // },
  // {
  //   id: 3,
  //   name: "Jovie Jurac",
  //   department: "ML Wallet - Backend",
  //   project: 9,
  //   status: "Busy",
  //   ratings: 4,
  //   profilePicture: "jprofile.jpg",
  //   email: "jovie@example.com",
  //   phone: "123-456-7890",
  //   skills: ["React", "Redux", "TypeScript"],
  //   projects: [
  //     { name: "Project E", status: "Done" },
  //     { name: "Project F", status: "Ongoing" },
  //   ],
  // },
];

const DeveloperTable: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // Initially true to show loader
  const [editDeveloper, setEditDeveloper] = useState<Developer>({
    id: 0,
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(
    null
  );
  const [isRatingExceededModalOpen, setIsRatingExceededModalOpen] =
    useState(false);
  const [selectedDeveloperToDelete, setSelectedDeveloperToDelete] =
    useState<Developer | null>(null);

  const router = useRouter();

  const selectProject = async (id: number) => {
    const result = await selectUniqueProjects(id);
    return result.data;
  };
  const getTopDev = async (skips: number, takes: number) => {
    const SKIP = skips === null ? 0 : skips;
    const TAKE = takes === null ? 10 : takes;
    const result = await getTopDevelopers(1, +SKIP, +TAKE);
    const { data } = result;
    let arrList = [];
    data.map(async (dev: DeveloperDetails, index) => {
      if (dev.task[index] !== undefined) {
        const selectProjects = await selectProject(dev.task[index].projectId);
        arrList.push({
          name: selectProjects.project,
          status: selectProjects.status,
        });
      }

      //Populate Developer interface with response from API.
      const developerDetails: Developer = {
        id: dev.id,
        name: `${dev.first_name} ${dev.last_name}`,
        department: dev.role,
        status: dev.isAvailable === 1 ? "Vacant" : "Busy",
        ratings: dev.points,
        email: dev.email,
        project: arrList.length,
        profilePicture: profilePic[randomIndex],
        skills: dev.tech_stack.map((row) => row.title),
        phone: `${dev.mobile_no}`,
        projects: arrList,
      };

      if (data.length > initialDevelopersData.length) {
        if (
          initialDevelopersData.find((item) => item.id === dev.id) === undefined
        ) {
          initialDevelopersData.push(developerDetails);
        }
      }
      console.log(initialDevelopersData);
    });
    setDevelopers(initialDevelopersData);
  };

  useEffect(() => {
    // Simulating a fetch call with a timeoutconst devs = await
    setTimeout(async () => {
      setLoading(false); // Set loading to false after data fetch
    }, 1000);
    // Change this timeout duration to simulate loading time
    getTopDev(null, null);
  }, []);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedDevelopers = [...developers];
    updatedDevelopers[index].status = newStatus;
    const editParams: EditParams = {
      id: updatedDevelopers[index].id,
      name: "",
      status: newStatus,
      department: "",
      ratings: 0,
    };
    console.log(editParams);
    const updatAvailability = updateDeveloperDetails(editParams, true);
    console.log(updatAvailability);
    setDevelopers(updatedDevelopers);
  };

  const handleAddDeveloper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedDevelopers = [...developers];
      updatedDevelopers[editingIndex] = editDeveloper;
      setDevelopers(updatedDevelopers);
      const editParams: EditParams = {
        id: editDeveloper.id,
        name: editDeveloper.name,
        status: editDeveloper.status,
        department: editDeveloper.department,
        ratings: editDeveloper.ratings,
      };

      const updateDeveloper = await updateDeveloperDetails(editParams, false);
      if (!updateDeveloper) {
        toast.error("Unable to update developer details");
      } else {
        toast.success("Successfully to updated developer details");
      }

      //Setting index to null or reset setEditingIndex
      setEditingIndex(null);
    } else {
      const splitname = editDeveloper.name.toString().split(" ");

      // Add Developer
      const developerDetails: DeveloperDetails = {
        first_name: splitname[0].trim().toUpperCase(),
        last_name: splitname[1].trim().toUpperCase(),
        role: editDeveloper.department,
        points: +editDeveloper.ratings,
        isAvailable: editDeveloper.status === "Vacant" ? 1 : 0,
        isActive: 1,
      };
      console.log(developerDetails);
      const addDeveloperDetails = await addDevelopers(developerDetails);
      console.log(addDeveloperDetails);
      editDeveloper.profilePicture = profilePic[randomIndex];
      if (editDeveloper.ratings > 5) {
        setIsRatingExceededModalOpen(true);
        return;
      }
      setDevelopers([...developers, editDeveloper]);
    }
    setEditDeveloper({
      id: 0,
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
    setIsOpenModal(false);
  };

  const handleEditDeveloper = (index: number) => {
    setEditDeveloper(developers[index]);
    setEditingIndex(index);
    setIsOpenModal(true);
  };

  const handleDeleteDeveloper = () => {
    if (selectedDeveloperToDelete) {
      const updatedDevelopers = developers.filter(
        (dev) => dev !== selectedDeveloperToDelete
      );
      const deleteDev = deleteDevelopers(selectedDeveloperToDelete.id);
      console.log(deleteDev);
      setDevelopers(updatedDevelopers);
      setSelectedDeveloperToDelete(null); // Reset selected developer to delete
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "ratings" && parseInt(value) > 5) {
      setIsRatingExceededModalOpen(true);
      setEditDeveloper({ ...editDeveloper, [name]: 5 });
    } else {
      setEditDeveloper({ ...editDeveloper, [name]: value });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditDeveloper({
      id: 0,
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
    setIsOpenModal(false);
  };

  const handleAddDeveloperModal = () => {
    setEditingIndex(null);
    setEditDeveloper({
      id: 0,
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
    setIsOpenModal(true);
  };

  const handleDeveloperClick = (dev: Developer) => {
    setSelectedDeveloper(dev);
  };

  const closeProfileModal = () => {
    setSelectedDeveloper(null);
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-8">
          <div className="flex justify-between items-center mb-15">
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
                      className="text-sm flex items-center gap-2 cursor-pointer  hover:font-bold"
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
                  <td className="text-sm py-8 px-4 border-b border-dashed cursor-pointer ">
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
                  <td className=" border-b border-dashed">
                    <button
                      onClick={() => handleEditDeveloper(index)}
                      className=" text-yellow-700 px-4 py-2 rounded mr-2 "
                    >
                      <FaEdit className="hover:text-yellow-500" />
                    </button>
                    <button
                      onClick={() => setSelectedDeveloperToDelete(dev)}
                      className=" text-red-900 -ml-2 px-4 py-2 rounded"
                    >
                      <FaTrash className="hover:text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={isOpenModal} onClose={handleCancelEdit}>
            <div className="mt-7 ml-11 h-full">
              <div className="  rounded-2xl  shadow-lg w-full h-full -mt-9 -ml-4 border-t-4 border-t-red-900">
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

          <Modal
            isOpen={selectedDeveloper !== null}
            onClose={closeProfileModal}
          >
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

          <Modal
            isOpen={selectedDeveloperToDelete !== null}
            onClose={() => setSelectedDeveloperToDelete(null)}
          >
            <div className="text-center">
              <h1 className="text-xl mb-4">
                Are you sure you want to delete this developer?
              </h1>
              <div className="flex items-center justify-center gap-4 cursor-pointer">
                <p onClick={() => setSelectedDeveloperToDelete(null)}>Cancel</p>
                <span
                  onClick={() => {
                    handleDeleteDeveloper();
                    setSelectedDeveloperToDelete(null);
                  }}
                  className="bg-red-800 text-white text-sm px-4 py-2 rounded-2xl hover:bg-red-900 cursor-pointer"
                >
                  Delete
                </span>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Layout>
  );
};

export default DeveloperTable;
