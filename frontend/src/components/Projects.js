import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiCode, FiDatabase } from "react-icons/fi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchProjects();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("projects");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const backendUrl =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
      const response = await fetch(`${backendUrl}/api/projects`);
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Fallback data
      // Inside fetchProjects() -> catch block
      setProjects([
        {
          id: "music-player",
          title: "Music Player",
          description:
            "A PHP-MySQL based system for music playback with features like mute, volume control, and user login functionality.",
          technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
          github_url: "https://github.com/rk2281",
          demo_url: null,
          image_url: null,
        },
        {
          id: "food-ordering",
          title: "Food Ordering Website",
          description:
            "A fully responsive HTML/CSS-based food delivery platform with comprehensive user registration system.",
          technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap",
            "Responsive Design",
          ],
          github_url: "https://github.com/rk2281",
          demo_url: null,
          image_url: null,
        },
        {
          id: "roll-a-die",
          title: "Roll a Die",
          description:
            "A browser-based dice rolling game built with HTML, CSS, and JavaScript. Designed as a practice project to strengthen DOM manipulation, JavaScript fundamentals, event handling, and game logic.",
          technologies: ["HTML", "CSS", "JavaScript"],
          github_url: "https://rk2281.github.io/roll_a_die_game/",
          demo_url: null,
          image_url: null,
        },
        {
          id: "farm-fresh",
          title: "Farm Fresh Website | Backend Fetching Data",
          description:
            "Built a backend service in Node.js to serve farm product data (e.g., mangoes, rice, tea, butter) directly from JSON documents, enabling integration with front-end or mobile clients.",
          technologies: [
            "HTML",
            "CSS",
            "Node.js",
            "JSON-Documents",
            "Render (Hosting)",
          ],
          github_url: "https://indian-farmfresh-backend-1.onrender.com/",
          demo_url: null,
          image_url: null,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectIcon = (title) => {
    if (title.toLowerCase().includes("music")) return "🎵";
    if (title.toLowerCase().includes("food")) return "🍕";
    if (
      title.toLowerCase().includes("dice") ||
      title.toLowerCase().includes("die")
    )
      return "🎲";
    return "🌾";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading projects...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills
            in full-stack development and modern web technologies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-white dark:bg-dark-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover overflow-hidden group"
            >
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getProjectIcon(project.title)}
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <FiGithub size={20} />
                      Code
                    </a>
                  )}

                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
                    >
                      <FiExternalLink size={20} />
                      Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-2 bg-white dark:bg-dark-800 rounded-full shadow-lg">
                  <FiCode
                    className="text-primary-600 dark:text-primary-400"
                    size={20}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Want to see more?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              These are just a few highlights of my work. I'm always working on
              new projects and exploring emerging technologies.
            </p>
            <a
              href="https://github.com/rk2281"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary btn-glow"
            >
              <FiGithub size={20} />
              View All Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
