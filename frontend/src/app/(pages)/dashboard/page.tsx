"use client";
import React, { useEffect, useState } from "react";
import { FaProjectDiagram, FaClipboardList } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import Layout from "@/components/Layout";
import Box from "@/components/boxdashboard/Box";
import TopDevelopers from "@/components/topdevs/TopDeveloper";
import AllDeveloper from "@/components/developerlist/AllDeveloper";
import ProjectList from "@/components/projectlist/ProjectList";
import Loader from "@/components/loader/Loader";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Simulating a fetch call with a timeout
    setTimeout(() => {
      setLoading(false); // Set loading to false after data fetch
    }, 1000); // Change this timeout duration to simulate loading time
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-8 mr-8">
          <div>
            <h1 className="font-bold text-2xl">Dashboard</h1>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Box
              icon={<FaProjectDiagram />}
              title="Projects"
              value="2"
              color="green"
            />
            <Box
              icon={<FaClipboardList />}
              title="Delayed Projects"
              value="2/2"
              color="yellow"
            />
            <Box
              icon={<GiSandsOfTime />}
              title="At Risk Projects"
              value="2/2"
              color="red"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 w-full gap-4">
              <TopDevelopers />
              <AllDeveloper />
            </div>
            <div className="w-full">
              <ProjectList />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
