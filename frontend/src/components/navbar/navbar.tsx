"use client"

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface NavbarProps {
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  const links = [
    { name: "Home", href: "/", scroll: false },
    { name: "Features", href: "/features", scroll: currentPage === 'Home' },
    { name: "Contact", href: "/contact", scroll: currentPage === 'Home' },
    { name: "Gallery", href: "/gallery", scroll: false },
  ];

  const navRef = useRef(null);
  const isInView = useInView(navRef, { once: true, amount: 0.1 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  interface NavItemProps {
    link: typeof links[0];
    extraClass: string;
    onClose?: () => void;
  }

  const NavItem: React.FC<NavItemProps> = ({ link, extraClass, onClose }) => {
    const isExcluded = link.name === currentPage;

    let content;

    if (isExcluded) {
      content = (
        <span className={`${extraClass} font-semibold text-gray-500 cursor-not-allowed`}>
          {link.name}
        </span>
      );
    } else if (link.scroll) {
      content = (
        <button
          onClick={() => {
            scrollToSection(link.href.slice(1));
            if (onClose) onClose();
          }}
          className={`${extraClass} font-semibold transition-colors text-gray-200 hover:text-blue-500`}
        >
          {link.name}
        </button>
      );
    } else {
      let targetHref = link.href;
      if (link.name !== 'Home' && link.name !== 'Gallery') {
        targetHref = `/#${link.href.slice(1)}`;
      }
      content = (
        <Link
          href={targetHref}
          className={`${extraClass} font-semibold transition-colors text-gray-200 hover:text-blue-500`}
          onClick={onClose}
        >
          {link.name}
        </Link>
      );
    }

    return (
      <motion.div
        key={link.name}
        whileHover={!isExcluded ? { scale: 1.05 } : {}}
        whileTap={!isExcluded ? { scale: 0.95 } : {}}
      >
        {content}
      </motion.div>
    );
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: -20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full bg-[#1e1e2f] backdrop-blur-sm z-50 mb-"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-br from-gray-200 to-blue-600 bg-clip-text text-transparent">
          PrintPop 3D
        </div>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <NavItem key={link.name} link={link} extraClass="text-base md:text-lg" />
          ))}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-200 hover:text-blue-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden bg-black/90 px-4 pt-2 pb-4 space-y-2"
        >
          {links.map((link) => (
            <NavItem
              key={link.name}
              link={link}
              extraClass="block text-base"
              onClose={() => setIsOpen(false)}
            />
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;