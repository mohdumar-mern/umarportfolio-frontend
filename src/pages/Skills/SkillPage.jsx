import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkills } from "../../features/Skills/skillSlice";
import Container from "../../components/UI/Container/Container";
import SkillCard from "../../components/UI/card/SkillCard";

const SkillPage = () => {
  const dispatch = useDispatch();
  const { skills, error, loading } = useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  return (
    <Container>
      <section className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center my-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
            My <span className="text-orange-500">Skills</span>
          </h1>
          <p className="text-[#BDC3C7] text-sm sm:text-base">
            Technologies I've worked with and mastered
          </p>
        </div>

        {/* Error Handling */}
        {error && (
          <p className="text-red-500 text-center mb-6 text-lg font-semibold">
            {error}
          </p>
        )}

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {!loading && skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard
                key={skill._id}
                title={skill.title}
                level={skill.level}
                imageUrl={skill?.file?.url}
                category={skill.category}
              />
            ))
          ) : (
            !loading && (
              <p className="text-white text-center col-span-full mt-8">
                No skills available at the moment.
              </p>
            )
          )}
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading skills...</p>
          </div>
        )}
      </section>
    </Container>
  );
};

export default SkillPage;
