import React from "react";
import Link from "next/link";
import logo from "../../../public/placeholder.webp";
import Image from "next/image";

const Footer: React.FC = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-[#0e0e0e] text-gray-200 border-t border-gray-700">
      <div className="max-w-[1200px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col-reverse">
          <Link href="/" className="flex flex-col items-center md:items-start">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-4">
              Company Name
            </span>
          </Link>
          <Image
            src={logo}
            alt="company logo"
            width={600}
            height={1300}
            className="w-[100px] mb-8 scale-[1.5] rounded-md mt-4 mx-auto bg-white object-cover"
          />
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            Contact
          </h3>
          <p className="text-sm sm:text-base md:text-lg mb-2">
            123 Placeholder Street, City, Country
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-2">
            <a href="tel:+1234567890" className="hover:text-[#00bfff] transition-colors">
              (123) 456-7890
            </a>
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-2">
            <a
              href="mailto:info@company.com"
              className="hover:text-[#00bfff] transition-colors"
            >
              info@company.com
            </a>
          </p>
          <a
            href="#contact"
            className="text-sm sm:text-base md:text-lg hover:text-[#00bfff] transition-colors underline"
          >
            Get in Touch
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            Navigation
          </h3>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm sm:text-base md:text-lg hover:text-[#00bfff] transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Developer Credit */}
      <div className="text-center mt-4 pb-8 px-4 text-xs sm:text-sm md:text-base text-gray-400">
        Developed by{" "}
        <a
          href="#"
          className="hover:text-[#00bfff] transition-colors"
        >
          Your Company
        </a>
      </div>
    </footer>
  );
};

export default Footer;
