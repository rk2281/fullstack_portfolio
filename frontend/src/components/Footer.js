import React from 'react';
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      href: 'https://github.com/rk2281',
      label: 'GitHub'
    },
    {
      icon: FiLinkedin,
      href: 'https://www.linkedin.com/in/rachitkapoor1/',
      label: 'LinkedIn'
    },
    {
      icon: FiMail,
      href: 'mailto:rachitkapoor2281@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Rachit Kapoor
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Front-End Developer passionate about creating beautiful, functional web applications 
              and exploring the exciting possibilities of Generative AI.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 dark:bg-dark-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <FiMail size={16} className="mr-2" />
                <a 
                  href="mailto:rachitkapoor2281@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  rachitkapoor2281@gmail.com
                </a>
              </div>
              <div className="text-gray-400">
                <p className="text-sm">Available for freelance work</p>
                <p className="text-sm">Open to collaboration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-gray-400 mb-4 md:mb-0">
            <span>Made with</span>
            <FiHeart className="mx-2 text-red-500 animate-pulse" size={16} />
            <span>by Rachit Kapoor © {currentYear}</span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-300 hover:scale-110 group"
            aria-label="Scroll to top"
          >
            <FiArrowUp 
              size={20} 
              className="group-hover:-translate-y-1 transition-transform duration-300" 
            />
          </button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </footer>
  );
};

export default Footer;