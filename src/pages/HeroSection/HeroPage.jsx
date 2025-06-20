import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import bgImage from "../../assets/bgImg.jpg";
import Container from "../../components/UI/Container/Container";
import AvatarCard from "../../components/UI/card/AvatarCard";
import ResumeDownload from "../../components/UI/card/ResumeDownload";
import SocialLinksComponents from "../../components/Sociallinks/SocialLinksComponents";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 0 8px rgb(255, 165, 0)",
  transition: { duration: 0.3, ease: "easeInOut" },
};

const avatarHover = {
  scale: 1.05,
  boxShadow: "0 0 20px rgb(255, 140, 0)",
  transition: { duration: 0.5, yoyo: Infinity, ease: "easeInOut" },
};

const Home = () => {
  return (
    <Container>
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden">
        {/* 🔹 Left: Profile with background and animated AvatarCard */}
        <motion.div
          className="flex items-center justify-center bg-cover p-10 bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-label="background section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            whileHover={avatarHover}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
          >
            <AvatarCard />
          </motion.div>
        </motion.div>

        {/* 🔸 Right: Content with staggered fade and slide-up animation */}
        <motion.div
          className="flex items-center justify-center bg-black px-6 lg:px-12 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.aside className="space-y-6 max-w-xl text-white">
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-400"
              variants={fadeSlideUp}
            >
              Hi, I'm Mohd Umar
            </motion.h1>

            <motion.h2
              className="text-lg md:text-xl lg:text-2xl font-medium"
              variants={fadeSlideUp}
            >
              I'm a&nbsp;
              <span className="text-orange-400 font-semibold">MERN Stack Developer,</span>
            </motion.h2>

            <motion.p
              className="text-gray-300 text-base md:text-lg leading-relaxed"
              variants={fadeSlideUp}
            >
              I'm a MERN Stack Developer from Noida, Uttar Pradesh, India. I
              specialize in building full-stack applications using MongoDB,
              Express.js, React, and Node.js. I'm confident in connecting
              front-end and back-end with RESTful APIs, managing state with
              Redux, and creating secure, scalable web apps. I'm passionate
              about cloud deployment, database design, and performance
              optimization. Let's build something amazing together!
            </motion.p>

            {/* Social Links with subtle hover scale */}
            <motion.div variants={fadeSlideUp}>
              <SocialLinksComponents
                className="flex gap-4"
                style={{ cursor: "pointer" }}
              />
            </motion.div>

            {/* Buttons with hover animations */}
            <motion.div className="flex flex-wrap  items-center gap-4 pt-2" variants={fadeSlideUp}>
              <motion.div whileHover={buttonHover}>
                <ResumeDownload />
              </motion.div>

              <motion.div whileHover={buttonHover}>
                <Link
                  to="/contact-us"
                  className="px-6 py-2 rounded-md border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition duration-300"
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>
          </motion.aside>
        </motion.div>
      </section>
    </Container>
  );
};

export default Home;
