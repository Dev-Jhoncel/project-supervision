"use client";
import React from "react";
import Layout from "@/components/Layout";
import { FaPlus } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

type Task = {
  title: string;
  level: "High" | "Medium" | "Low";
  status: "Done" | "Review";
};

const tasks: Task[] = [
  { title: "Check the user dashboard", level: "High", status: "Done" },
  { title: "Lorem lorem lorem", level: "Medium", status: "Review" },
  { title: "Landing Page Lorem", level: "Medium", status: "Done" },
  {
    title: "Lorem lorem lorem lorem lorem lorem lorem lorem",
    level: "Low",
    status: "Review",
  },
];

const TaskList: React.FC = () => {
  return (
    <div className="p-6 bg-white-100 mt-16 min-h-96 shadow-xlg">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-4">Today task</h2>
          <div className="ml-auto">
            <button className="flex items-center gap-2 bg-white-500 text-black px-4 py-2 rounded-full hover:bg-green-50 border border-black">
              <div className="border border-green-900 bg-green-900 rounded-full ">
                <FaPlus className="text-white" />
              </div>
              Create new task
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mb-3">
          <button className="border-b-2 border-blue-500 pb-1">
            All <span className="hover:text-green-900 cursor-pointer">10</span>
          </button>
          <button>Done 10</button>
          <h1 className="">Level</h1>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className=""
                  defaultChecked={task.status === "Done"}
                />
                <span>{task.title}</span>
              </div>
              <div className="flex space-x-4">
                <span>{task.level}</span>
                <span
                  className={`${
                    task.status === "Done"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  } py-1 px-2 rounded-lg`}
                >
                  {task.status}
                </span>
                <div className="hover: text-bold">
                  <CiMenuBurger />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
