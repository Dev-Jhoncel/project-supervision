import React from "react";
import { IoMdPerson } from "react-icons/io";
import { FaProjectDiagram, FaClipboardList } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import Layout from "@/components/Layout";
import { GoArrowDownRight } from "react-icons/go";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 flex flex-col gap-8 mr-8">
        <div>
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="bg-white-100 shadow-2xl bg-gradient-to-tl rounded-b-3xl rounded-t-3xl w-80 h-52 p-6">
            <div className="bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center">
              <div className="text-white">
                <IoMdPerson />
              </div>
            </div>
            <div className="mt-9">
              <h2 className="text-sm text-gray-400">List of Developers</h2>
              <h1 className="text-2xl mt-2 text-black font-semibold mt-6">
                50 dev
              </h1>
            </div>
          </div>

          <div className="bg-white-100 shadow-2xl bg-gradient-to-tl rounded-b-3xl rounded-t-3xl w-80 h-52 p-6">
            <div className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center">
              <div className="text-white">
                <FaProjectDiagram />
              </div>
            </div>
            <div className="mt-9">
              <h2 className="text-sm text-gray-400">Projects</h2>
              <h1 className="text-2xl mt-2 text-black font-semibold">2/2</h1>
              <div className="mt-4">
                <GoArrowDownRight />
                <p className="text-xs mt-2 text-red-600 ml-6 -mt-2">
                  2 projects from month of May
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white-100 shadow-2xl bg-gradient-to-tl rounded-b-3xl rounded-t-3xl w-80 h-52 p-6">
            <div className="bg-yellow-600 w-10 h-10 rounded-full flex items-center justify-center">
              <div className="text-white">
                <FaClipboardList />
              </div>
            </div>
            <div className="mt-9">
              <h2 className="text-sm text-gray-400">Delayed Projects</h2>
              <h1 className="text-2xl mt-2 text-black font-semibold">2/2</h1>
              <div className="mt-4 ">
                <GoArrowDownRight />
                <p className="text-xs mt-2 text-red-600 ml-6 -mt-2">
                  2 projects from month of May
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white-100 shadow-2xl bg-gradient-to-tl rounded-b-3xl rounded-t-3xl w-80 h-52 p-6">
            <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center">
              <div className="text-white">
                <GiSandsOfTime />
              </div>
            </div>
            <div className="mt-9">
              <h2 className="text-sm text-gray-400">At Risk Projects</h2>
              <h1 className="text-2xl mt-2 text-black font-semibold">2/2</h1>
              <div className="mt-4">
                <GoArrowDownRight />
                <p className="text-xs mt-2 text-red-600 ml-6 -mt-2">
                  2 projects from month of May
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-100 shadow-xl bg-gradient-to-tl rounded-b-2xl rounded-t-2xl w-7/12 h-60 ml-2 pr-20 mt-1">
          <h1 className="font-bold text-xl mt-2 ml-4">Projects</h1>
        </div>
        <div className="bg-red-100 shadow-xl bg-gradient-to-tl rounded-b-2xl rounded-t-2xl w-7/12 h-52 ml-2 pr-20 -m-1">
          <h1 className="font-bold text-xl mt-2 ml-4">{`Today's Task`}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
