import React from "react";
import { Link } from "react-router-dom";

import waquarImg from "../../assets/avatar.jpg";
import bgImage from "../../assets/bgImg.jpg";
import Container from "../../components/UI/Container/Container";



const Home = () => {
  return (
    <Container>
      <section
       
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden"
      >
        {/* 🔹 Left: Profile with background */}
        <div
          className="flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-label="Waquar Ahmad's background section"
        >
          <div
           
            className="backdrop-blur-md bg-black/30 p-6 rounded-full shadow-xl w-80 h-80 flex items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={waquarImg}
              alt="Portrait of Waquar Ahmad"
              className="rounded-full w-full h-full object-cover shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* 🔸 Right: Content */}
        <div className="flex items-center justify-center bg-black px-6 lg:px-12 py-12">
          <aside
        
            className="space-y-6 max-w-xl text-white"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-400">
            Hi, I'm Mohd Umar
            </h1>

            <h2 className="text-lg md:text-xl lg:text-2xl font-medium">
            I'm a &nbsp;
              <span className="text-orange-400 font-semibold">MERN Stack Developer,</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            I'm a MERN Stack Developer from Noida, Uttar Pradesh, India. I specialize in building full-stack applications using MongoDB, Express.js, React, and Node.js. I'm confident in connecting front-end and back-end with RESTful APIs, managing state with Redux, and creating secure, scalable web apps. I'm passionate about cloud deployment, database design, and performance optimization. Let's build something amazing together!
            </p>

            {/* 🔗 Social Media Icons */}
            {/* <SocialIcons /> */}

            {/* 🔘 Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Resume.pdf"
                download="Waquar_Ahmad_Resume.pdf"
                className="px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition duration-300"
                aria-label="Download Waquar Ahmad's resume"
              >
                Download CV
              </a>
              <Link
                to="/contact"
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
