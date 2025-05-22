import React from "react";
import { Link } from "react-router-dom";

import waquarImg from "../../assets/avatar.jpg";
import bgImage from "../../assets/bgImg.jpg";
import Container from "../../components/UI/Container/Container";


const skills = [
    'JavaScript',
    'React',
    'Node.js',
    'Git',
    'NPM',
    'Express',
    'MongoDB'
    
  
  
];

const AboutPage = () => {
    return (
        <Container>
          <section
           
            className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden"
          >
           
    
            {/* 🔸 Right: Content */}
            <div className="flex items-center justify-center bg-black px-6 lg:px-12 py-12">
              <aside
            
                className="space-y-6 max-w-xl text-white"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-400">
                About Me
                </h1>
    
                <h2 className="text-lg md:text-xl lg:text-2xl font-medium">
                I'm a &nbsp;
                  <span className="text-orange-400 font-semibold">MERN Stack Developer,</span>
                </h2>
    
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Hi, I'm Mohd Umar, a MERN Stack Developer from Noida, Uttar Pradesh, India. I enjoy building full-stack web applications that are fast, responsive, and user-friendly. My core skills include MongoDB, Express.js, React.js, and Node.js, and I love turning ideas into real, working websites.
                </p>
                <p className="text-gray-300 text-base md:text-lg ">
                I'm confident in building full-stack applications using the MERN stack. I connect the front-end and back-end seamlessly using RESTful APIs, manage state efficiently with Redux, and focus on creating secure, scalable, and responsive web applications.
                </p>
    
                {/* 🔗 Social Media Icons */}
                {/* <SocialIcons /> */}
    
                {/* 🔘Skills */}
                <div>
              <h3 className="text-white text-2xl font-semibold mb-2">Skills</h3>
              <ul className="text-white text-base list-none flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 hover:bg-orange-600  transition-colors duration-300 cursor-default bg-orange-500 px-4 py-2 rounded-lg"
                    title={skill}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
              </aside>
            </div>
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
          </section>
        </Container>
      );
};

export default AboutPage;
