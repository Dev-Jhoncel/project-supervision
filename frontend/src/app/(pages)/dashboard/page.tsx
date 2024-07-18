"use client";
import React, { useEffect, useState } from "react";
import { FaProjectDiagram, FaClipboardList } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import Layout from "@/components/Layout";
import Box from "@/components/boxdashboard/Box";
import TopDevelopers from "@/components/topdevs/TopDeveloper";
import AllDeveloper from "@/components/developerlist/AllDeveloper";
import ProjectList from "@/components/projectlist/ProjectList";
import { selectProjects } from "@/utils/ProjectsFunc/SelectProjects";
import { IStatusEnum } from "@/interfaces/IStatusEnum";
import { getUserDetails } from "@/utils/UserDetailsFunc/UserDetails";
import { Project } from "@/interfaces/IProjects";
import { selectStatusEnum } from "@/utils/StatusEnumFunc/SelectStatus";
import Loader from "@/components/loader/Loader";

const Dashboard: React.FC = () => {
  const [totalActiveProject, setTotalActiveprojects] = useState(0);
  const [totalDelayedProject, setTotalDelayedProject] = useState("");
  const [totalAtRiskPorject, setTotalAtRiskProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [allActiveProject, setallActiveProject] = useState<Project[]>();

  interface ProjectListProps {
    projects: Project[];
  }

  const allProject: SelectedProjects[] = [];
  interface SelectedProjects {
    id: number;
    project: string;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
    team_id: number;
    user_id: number;
    status: string;
    isActive: number;
    taskId: number;
  }

  const getAllPorject = async () => {
    const decodeToken = getUserDetails();

    const getProjects = await selectProjects(decodeToken?.id);
    console.log(getProjects);
    if (getProjects !== null) {
      allProject.push(getProjects);

      const delayedProject = getProjects.filter(
        (data: SelectedProjects) => data.status === IStatusEnum.Delay
      );
      setTotalDelayedProject(`${delayedProject.length}/${getProjects.length}`);

      const atRiskProject = getProjects.filter(
        (m: SelectedProjects) => m.status === IStatusEnum.AtRisk
      );
      setTotalAtRiskProject(`${atRiskProject.length}/${getProjects.length}`);
      const selectedProject: Project[] = [];
      getProjects.map((data: SelectedProjects) => {
        const formattedProject = {
          name: data.project,
          dueDate: data.due_date,
          status: selectStatusEnum(data.status.trim()),
        };
        selectedProject.push(formattedProject);
      });
      setallActiveProject(selectedProject);
      setTotalActiveprojects(getProjects.length);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      getAllPorject();
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [loading]);

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
              value={`${totalActiveProject}`}
              color="green"
            />
            <Box
              icon={<FaClipboardList />}
              title="Delayed Projects"
              value={`${totalDelayedProject}`}
              color="yellow"
            />
            <Box
              icon={<GiSandsOfTime />}
              title="At Risk Projects"
              value={`${totalAtRiskPorject}`}
              color="red"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 w-full gap-4">
              <TopDevelopers />
              <AllDeveloper />
            </div>
            <div className="w-full">
              <ProjectList project={allActiveProject} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
