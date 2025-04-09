import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { SquareScissors, LogOut, FolderClosed, Tags, StickyNote, LayoutDashboard } from 'lucide-react';
import logo from '../assets/logo.jpg';
import defaultAvatar from '../assets/aadi.jpg';


interface NavBarProps {
  isAuthenticated: boolean;
  userProfile?: {
    name: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  isAuthenticated,
  userProfile,
  onLogout,
}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  /* search changes starts*/

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length >= 3) {
      navigate(`/search?query=${query}`);
    }
  };


  /*search changes ends*/

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`${!isLoginPage ? 'mb-6' : ''} bg-black text-white shadow-lg relative`}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      {/* Mobile Logo */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-white tracking-wide"
          >
            <img src={logo} alt="Geopolitik Simplified" className="w-6 h-6" />
            Geopolitik Simplified
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop layout */}
      <div className="hidden sm:flex w-full items-center justify-between px-4 relative">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-3 font-bold text-2xl tracking-wider bg-gradient-to-r from-purple-500 via-white to-blue-500 text-transparent bg-clip-text transition-all duration-300 hover:scale-105"
          >
            <img src={logo} alt="Geopolitik Simplified Logo" className="w-8 h-8" />
            Geopolitik Simplified
          </Link>
        </div>

        {/* Center: Nav Menu */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          {menuItems.map((item) => (
            <NavbarItem key={item.path} isActive={location.pathname === item.path}>
              <Link
                to={item.path}
                className={`text-md font-medium transition-all duration-300 ${location.pathname === item.path
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>

            </NavbarItem>

          ))}


        </div>



        {/* Right: Buttons / Avatar */}
        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 py-1 shadow-md w-64 focus-within:ring-2 ring-blue-400 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.293 14.707a8 8 0 111.414-1.414l4.586 4.586a1 1 0 01-1.414 1.414l-4.586-4.586zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ml-2 flex-grow text-sm bg-transparent text-black placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 text-sm bg-blue-400 text-black px-3 py-1 rounded-full font-semibold hover:bg-blue-500 transition-all duration-200"
            >
              Go
            </button>
          </form>

          {isAuthenticated ? (
            <>

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={userProfile?.avatar || defaultAvatar}
                    name={userProfile?.name || 'User'}
                    color="primary"
                  />

                </DropdownTrigger>
                <DropdownMenu aria-label="User menu" className="bg-white text-black">
                  <DropdownItem key="create-post" startContent={<StickyNote size={16} />}>
                    <Link to="/posts/new">Create New Post</Link>
                  </DropdownItem>

                  <DropdownItem key="drafts" startContent={<SquareScissors size={16} />}>
                    <Link to="/posts/drafts">My Drafts</Link>
                  </DropdownItem>

                  <DropdownItem key="categories" startContent={<FolderClosed size={16} />}>
                    <Link to="/categories">Categories</Link>
                  </DropdownItem>
                  <DropdownItem key="tags" startContent={<Tags size={16} />}>
                    <Link to="/tags">Tags</Link>
                  </DropdownItem>
                  <DropdownItem key="admin-dashboard" startContent={<LayoutDashboard size={16} />}>
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    startContent={<LogOut size={16} />}
                    onPress={onLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <Button
              as={Link}
              to="/login"
              className="border border-white text-white hover:bg-white hover:text-black"
              variant="flat"
            >
              Log In
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <NavbarMenu className="bg-black text-white">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              to={item.path}
              className={`block py-2 text-lg font-medium rounded hover:bg-white/10 ${location.pathname === item.path ? 'text-primary' : 'text-white'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
