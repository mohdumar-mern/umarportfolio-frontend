import React, { useMemo } from "react";
import { motion } from "framer-motion"; // <-- import motion
import { Link } from "react-router-dom";

import bgImage from "../../assets/bgImg.jpg";
import Container from "../../components/UI/Container/Container";
import AvatarCard from "../../components/UI/card/AvatarCard";

const AboutPage = () => {
  const skills = useMemo(
    () => [
      "JavaScript",
      "React",
      "Node.js",
      "Git",
      "NPM",
      "Express",
      "MongoDB",
    ],
    []
  );

  // Variants for parent container to stagger children animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Variants for text items: fade in + slide up
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variant for AvatarCard scale and fade
  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <Container>
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden">
        {/* 🔹 Left: Profile Section */}
        <motion.div
          className="flex items-center justify-center bg-black px-6 lg:px-12 py-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <aside className="space-y-6 max-w-xl text-white">
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-400"
              variants={textVariants}
            >
              About Me
            </motion.h1>

            <motion.h2
              className="text-lg md:text-xl lg:text-2xl font-medium"
              variants={textVariants}
            >
              I'm a{" "}
              <span className="text-orange-400 font-semibold">
                MERN Stack Developer,
              </span>
            </motion.h2>

            <motion.p
              className="text-gray-300 text-base md:text-lg leading-relaxed"
              variants={textVariants}
            >
              Hi, I'm Mohd Umar, a MERN Stack Developer from Noida, Uttar
              Pradesh, India. I enjoy building full-stack web applications that
              are fast, responsive, and user-friendly.
            </motion.p>

            <motion.p
              className="text-gray-300 text-base md:text-lg leading-relaxed"
              variants={textVariants}
            >
              I connect front-end and back-end seamlessly using RESTful APIs,
              manage state efficiently with Redux, and focus on secure,
              scalable, and responsive web apps.
            </motion.p>

            {/* 🔘 Skills List */}
            <div>
              <motion.h3
                className="text-white text-2xl font-semibold mb-2"
                variants={textVariants}
              >
                Skills
              </motion.h3>
              <motion.ul
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {skills.map((skill, index) => (
                  <motion.li
                    key={index}
                    title={skill}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 cursor-default"
                    variants={textVariants}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </aside>
        </motion.div>

        {/* 🔸 Right: Content Section */}
        <motion.div
          className="flex items-center justify-center bg-cover bg-center p-10 relative"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-label="background section"
          initial="hidden"
          animate="visible"
          variants={avatarVariants}
        >
          <AvatarCard />
        </motion.div>
      </section>
    </Container>
  );
};

export default React.memo(AboutPage);
