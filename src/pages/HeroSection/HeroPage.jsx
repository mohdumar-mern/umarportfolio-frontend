import React from "react";
import { Link } from "react-router-dom";

import waquarImg from "../../assets/avatar.jpg";
import bgImage from "../../assets/bgImg.jpg";
import Container from "../../components/UI/Container/Container";
import AvatarCard from "../../components/UI/card/AvatarCard";
import ResumeDownload from "../../components/UI/card/ResumeDownload";
import SocialLinksComponents from "../../components/Sociallinks/SocialLinksComponents";

const Home = () => {
  return (
    <Container>
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden">
        {/* 🔹 Left: Profile with background */}
        <div
          className="flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-label=" background section"
        >
            <AvatarCard />
        </div>

        {/* 🔸 Right: Content */}
        <div className="flex items-center justify-center bg-black px-6 lg:px-12 py-12">
          <aside className="space-y-6 max-w-xl text-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-400">
              Hi, I'm Mohd Umar
            </h1>

            <h2 className="text-lg md:text-xl lg:text-2xl font-medium">
              I'm a &nbsp;
              <span className="text-orange-400 font-semibold">
                MERN Stack Developer,
              </span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I'm a MERN Stack Developer from Noida, Uttar Pradesh, India. I
              specialize in building full-stack applications using MongoDB,
              Express.js, React, and Node.js. I'm confident in connecting
              front-end and back-end with RESTful APIs, managing state with
              Redux, and creating secure, scalable web apps. I'm passionate
              about cloud deployment, database design, and performance
              optimization. Let's build something amazing together!
            </p>

            {/* 🔗 Social Media Icons */}
            {/* <SocialIcons /> */}
            <SocialLinksComponents />

            {/* 🔘 Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
            <ResumeDownload />
              <Link
                to="/contact-us"
                className="px-6 py-2 rounded-md border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition duration-300"
              >
                Contact Me
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Container>
  );
};

export default Home;
