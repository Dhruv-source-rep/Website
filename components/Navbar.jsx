'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import styles from '../styles';
import { navVariants } from '../utils/motion';

const menuItems = [
  {
    title: 'Co-operate',
    items: [
      { link: '/about-us', icon: '📐', title: 'About Us' },
      { link: '/what-we-do', icon: '⬆️', title: 'What we do' },
      { link: '/approach', icon: '📊', title: 'Approach' },
      { link: '/blog', icon: '📊', title: 'Blog' },
    ],
  },
  {
    title: 'Services',
    items: [
      { link: '/web-app-pen-test', icon: '🛠️', title: 'Web App Penetration Testing' },
      { link: '/network-pen-test', icon: '🔍', title: 'Network Penetration Testing' },
      { link: '/ad-test', icon: '📜', title: 'Active Directory Testing' },
      { link: '/api-security-test', icon: '🛠️', title: 'API Security Testing' },
      { link: '/cloud-security', icon: '🔍', title: 'Cloud Security Assessment' },
      { link: '/wireless-test', icon: '📜', title: 'Wireless Penetration Testing' },
    ],
  },
  {
    title: 'WHY CUBeeSEC?',
    items: [
      { link: '/about-us', icon: '❓', title: 'About Us' },
      { link: '/our-vision', icon: '🌍', title: 'Our Vision' },
    ],
  },
  {
    title: 'Contact Us',
    items: [
      { link: '/phone', icon: '📞', title: 'Phone' },
      { link: '/location', icon: '📍', title: 'Location' },
    ],
  },
];

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const router = useRouter();

  const handleMouseEnter = useCallback((index) => setDropdownVisible(index), []);
  const handleMouseLeave = useCallback(() => setDropdownVisible(null), []);
  const handleNavigation = (link) => {
    if (link !== '#') {
      router.push(link);
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative z-50`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <div className={`${styles.innerWidth} mx-auto flex justify-between items-center gap-4 relative`}>
        <img src="/search.svg" alt="search" className="w-[24px] h-[24px] object-contain" />

        <div className="flex gap-6 relative z-50">
          {menuItems.map((menu, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="font-extrabold text-[15px] leading-[30.24px] text-white cursor-pointer">
                {menu.title}
              </p>
              {dropdownVisible === index && (
                <div className="absolute left-0 mt-2 w-56 bg-black bg-opacity-60 text-white shadow-lg rounded-lg overflow-hidden backdrop-blur-md transition-opacity duration-300 opacity-100 z-50">
                  {menu.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.link);
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <img src="/menu.svg" alt="menu" className="w-[24px] h-[24px] object-contain" />
      </div>
    </motion.nav>
  );
};

export default Navbar;
