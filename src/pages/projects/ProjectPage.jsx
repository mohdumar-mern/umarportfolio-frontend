import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/Project/projectSlice";
import Container from "../../components/UI/Container/Container";
import ProjectCardComponents from "../../components/UI/project/ProjectCardComponents";
import Pagination from "../../components/UI/pagination/Pagination";

const ProjectPage = () => {
  const dispatch = useDispatch();

  const {
    projects,
    loading,
    error,
    currentPage,
    totalPages,
    projectsPerPage,
  } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects({ page: currentPage, limit: projectsPerPage }));
  }, [dispatch, currentPage, projectsPerPage]);

  const handlePageChange = (page) => {
    dispatch(fetchProjects({ page, limit: projectsPerPage }));
  };


  return (
    <Container>
      <section className="w-full min-h-screen py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">My Projects</h1>
          <p className="text-gray-400">Some of the work I’ve done recently</p>
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-white">Loading...</p>}

        {/* Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Projects Grid */}
        {!loading && projects?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <ProjectCardComponents
                key={proj._id}
                image={proj.file?.url}
                title={proj.title}
                description={proj.description}
                techStack={proj.techStack[0]}
                githubLink={proj.githubLink}
                liveDemo={proj.liveDemo}
                createdAt={proj.createdAt}
                updatedAt={proj.updatedAt}
              />
            ))}
          </div>
        )}

        {/* No Projects */}
        {!loading && projects?.length === 0 && (
          <p className="text-center text-gray-400">No projects found.</p>
        )}

        {/* Pagination Placeholder */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}    />
        )}
      </section>
    </Container>
  );
};

export default ProjectPage;
