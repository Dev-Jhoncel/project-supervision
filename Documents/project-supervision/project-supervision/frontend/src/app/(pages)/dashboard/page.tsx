import React from "react";
import { FaProjectDiagram, FaClipboardList } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import Layout from "@/components/Layout";
import Box from "@/components/boxdashboard/Box";
import TopDevelopers from "@/components/topdevs/TopDeveloper";
import AllDeveloper from "@/components/developerlist/AllDeveloper";
import ProjectList from "@/components/projectlist/ProjectList";
import OverallProgress from "@/components/overallprogress/OverallProgress";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 flex flex-col gap-8 mr-8">
        <div>
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>

        <div className="flex gap-4 flex-wrap">
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

        <div className="flex gap-6">
          <div className="flex flex-col w-6/12">
            <TopDevelopers />
            <ProjectList />
          </div>
          <div className="flex flex-col w-5/12">
            <AllDeveloper />
            <OverallProgress />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
