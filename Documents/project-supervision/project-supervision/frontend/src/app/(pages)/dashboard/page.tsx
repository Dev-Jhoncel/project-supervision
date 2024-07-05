import React from "react";
import { FaProjectDiagram, FaClipboardList } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import Layout from "@/components/Layout";
import Box from "@/components/boxdashboard/Box";
import TopDevelopers from "@/components/topdevs/TopDeveloper";
import AllDeveloper from "@/components/developerlist/AllDeveloper";
import ProjectList from "@/components/projectlist/ProjectList";

const Dashboard: React.FC = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Dashboard;
