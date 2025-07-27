import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiGlobe } from 'react-icons/fi';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const skills = [
    {
      icon: FiCode,
      title: "Frontend Development",
      description: "Expertise in React.js, JavaScript, HTML, CSS, and responsive design principles",
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"]
    },
    {
      icon: FiServer,
      title: "Backend Development", 
      description: "Proficient in PHP development and building robust server-side applications",
      technologies: ["PHP", "Server Architecture", "API Development"]
    },
    {
      icon: FiDatabase,
      title: "Database Management",
      description: "Experience with SQL databases and data modeling for web applications",
      technologies: ["MySQL", "SQL", "Database Design"]
    },
    {
      icon: FiGlobe,
      title: "Cloud & Tools",
      description: "Familiar with cloud services, version control, and modern development tools",
      technologies: ["AWS Cloud Services", "GitHub", "UI/UX Design"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate front-end developer with hands-on experience in full-stack development. 
            I love creating beautiful, functional web applications and I'm always eager to learn new technologies, 
            especially in the exciting field of Generative AI.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
                  <skill.icon size={32} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {skill.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {skill.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              My Development Philosophy
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              I believe in writing clean, maintainable code and creating user experiences that are both 
              beautiful and functional. My passion for continuous learning keeps me updated with the latest 
              technologies and best practices in web development. I'm particularly excited about the potential 
              of Generative AI in transforming how we build and interact with web applications.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;