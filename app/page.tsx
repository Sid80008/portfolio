import { getProjects, getSkills, getExperiences } from "@/lib/data/fetchers";
import MasterPortfolio from "./MasterPortfolio";

export const dynamic = "force-dynamic"; // Ensure fresh data

export default async function Page() {
  // Parallel fetch for better performance
  const [initialProjects, initialSkills, initialExperiences] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperiences(),
  ]);

  return (
    <MasterPortfolio 
      initialProjects={initialProjects}
      initialSkills={initialSkills}
      initialExperiences={initialExperiences}
    />
  );
}
