import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiServer, 
  FiDatabase, 
  FiGlobe, 
  FiLayers,
  FiGithub,
  FiSettings,
  FiPenTool,
  FiCloud
} from 'react-icons/fi';

const Technologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchTechnologies();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('technologies');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchTechnologies = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/technologies`);
      const data = await response.json();
      setTechnologies(data.technologies);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      // Fallback data
      setTechnologies([
        { name: "React", category: "Frontend", level: "Advanced" },
        { name: "PHP", category: "Backend", level: "Advanced" },
        { name: "JavaScript", category: "Programming", level: "Advanced" },
        { name: "MySQL", category: "Database", level: "Intermediate" },
        { name: "Bootstrap", category: "CSS Framework", level: "Advanced" },
        { name: "HTML", category: "Markup", level: "Expert" },
        { name: "CSS", category: "Styling", level: "Advanced" },
        { name: "Python", category: "Programming", level: "Intermediate" },
        { name: "GitHub", category: "Version Control", level: "Advanced" },
        { name: "AWS Cloud Services", category: "Cloud", level: "Intermediate" },
        { name: "UI/UX Design", category: "Design", level: "Intermediate" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTechIcon = (name, category) => {
    const iconMap = {
      'React': FiCode,
      'JavaScript': FiCode,
      'HTML': FiCode,
      'CSS': FiPenTool,
      'Bootstrap': FiLayers,
      'PHP': FiServer,
      'Python': FiCode,
      'MySQL': FiDatabase,
      'GitHub': FiGithub,
      'AWS Cloud Services': FiCloud,
      'UI/UX Design': FiPenTool
    };
    
    return iconMap[name] || FiSettings;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const categories = ['All', ...new Set(technologies.map(tech => tech.category))];
  
  const filteredTechnologies = activeCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  if (isLoading) {
    return (
      <section id="technologies" className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading technologies...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="technologies" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredTechnologies.map((tech, index) => {
            const IconComponent = getTechIcon(tech.name, tech.category);
            
            return (
              <motion.div
                key={`${tech.name}-${index}`}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-dark-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {tech.category}
                </p>
                
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(tech.level)}`}>
                  {tech.level}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {technologies.filter(t => t.level === 'Expert' || t.level === 'Advanced').length}+
                </h4>
                <p className="text-gray-600 dark:text-gray-300">Advanced Skills</p>
              </div>
              
              <div>
                <h4 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {new Set(technologies.map(t => t.category)).size}+
                </h4>
                <p className="text-gray-600 dark:text-gray-300">Technology Areas</p>
              </div>
              
              <div>
                <h4 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  3+
                </h4>
                <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;