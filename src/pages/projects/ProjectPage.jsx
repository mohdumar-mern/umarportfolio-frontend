import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/Project/projectSlice";

import Container from "../../components/UI/Container/Container";
import Pagination from "../../components/UI/pagination/Pagination";
import ProjectCard from "../../components/UI/card/ProjectCard";

import { motion } from "framer-motion";

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

  // Animation variants for container and cards
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Container>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full min-h-screen py-12"
      >
        {/* 🔸 Header */}
        <motion.div variants={cardVariants} className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
            My <span className="text-orange-500">Projects</span>
          </h1>
          <p className="text-gray-400">Some of the work I’ve done recently</p>
        </motion.div>

        {/* 🔁 Loading */}
        {loading && (
          <motion.div
            variants={cardVariants}
            className="text-center mt-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading projects...</p>
          </motion.div>
        )}

        {/* ❌ Error */}
        {error && !loading && (
          <motion.p variants={cardVariants} className="text-center text-red-500">
            {error}
          </motion.p>
        )}

        {/* ✅ Project List */}
        {!loading && projects?.length > 0 && (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {projects.map((proj) => (
              <motion.div key={proj._id} variants={cardVariants}>
                <ProjectCard
                  image={proj.file?.url}
                  title={proj.title}
                  description={proj.description}
                  techStack={proj.techStack[0]}
                  githubLink={proj.githubLink}
                  liveDemo={proj.liveDemo}
                  createdAt={proj.createdAt}
                  updatedAt={proj.updatedAt}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 🚫 No Projects */}
        {!loading && projects?.length === 0 && (
          <motion.p variants={cardVariants} className="text-center text-gray-400">
            No projects found.
          </motion.p>
        )}

        {/* 🔽 Pagination */}
        {totalPages > 1 && (
          <motion.div variants={cardVariants} className="mt-10">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </motion.section>
    </Container>
  );
};

export default React.memo(ProjectPage);
