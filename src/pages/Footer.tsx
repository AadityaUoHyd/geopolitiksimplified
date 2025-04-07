import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Divider,
} from '@nextui-org/react';
import { Github, Youtube, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Footer = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
  return (
    <footer className={`${!isLoginPage ? 'mt-10' : ''} bg-black text-white pt-10 pb-6 border-t border-gray-800`}>
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-10">
    
    {/* Branding */}
    <div className="flex flex-col gap-3">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-white to-blue-400 text-transparent bg-clip-text">
        <img src={logo} alt="Geopolitik Simplified Logo" className="w-8 h-8" />
        Geopolitik Simplified
      </Link>
      <p className="text-gray-400 max-w-xs text-sm">
        Sharing knowledge, one post at a time.
      </p>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col gap-3 text-gray-300 ">
      <h4 className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-white to-blue-400 text-transparent bg-clip-text">
        Quick Links
      </h4>
      <div className="flex gap-4 text-gray-400 max-w-xs text-sm flex-wrap">
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/categories" className="hover:text-white">Categories</Link>
        <Link to="/tags" className="hover:text-white">Tags</Link>
        <Link to="/about" className="hover:text-white">About</Link>
      </div>
    </div>

    {/* Social Media */}
    <div className="flex flex-col gap-3 text-gray-300 text-left md:text-right">
      <h4 className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-white to-blue-400 text-transparent bg-clip-text">
        Follow Me
      </h4>
      <div className="flex gap-4">
        <a href="https://github.com/AadityaUoHyd" target="_blank" rel="noopener noreferrer">
          <Github className="w-5 h-5 hover:text-white" />
        </a>
        <a href="https://www.youtube.com/@geopolitiksimplified" target="_blank" rel="noopener noreferrer">
          <Youtube className="w-5 h-5 hover:text-white" />
        </a>
        <a href="https://twitter.com/in/aadityaraj8" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-5 h-5 hover:text-white" />
        </a>
        <a href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 hover:text-white" />
        </a>
        <a href="https://facebook.com/aaditya" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-5 h-5 hover:text-white" />
        </a>
        <a href="https://instagram.com/itsaadityaofficial" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-5 h-5 hover:text-white" />
        </a>
      </div>
    </div>

  </div>

  {/* Divider */}
  <div className="mt-8">
    <Divider className="bg-gray-700" />
    <p className="text-center text-sm text-gray-500 mt-4">
      © {new Date().getFullYear()} Geopolitik Simplified. All rights reserved.
    </p>
  </div>
</footer>

  );
};

export default Footer;
