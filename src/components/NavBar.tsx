import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { Plus, Edit3, LogOut, BookDashed } from 'lucide-react';
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
    { name: 'Categories', path: '/categories' },
    { name: 'Tags', path: '/tags' },
    { name: 'About', path: '/about' },
  ];

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
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
          {menuItems.map((item) => (
            <NavbarItem key={item.path} isActive={location.pathname === item.path}>
              <Link
                to={item.path}
                className={`text-md font-medium transition-all duration-300 ${
                  location.pathname === item.path
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
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button
                as={Link}
                to="/posts/drafts"
                className="bg-gray-800 text-white border border-white/20 hover:bg-gray-700"
                startContent={<BookDashed size={18} />}
              >
                Draft Posts
              </Button>
              <Button
                as={Link}
                to="/posts/new"
                className="bg-primary text-white hover:bg-primary/90"
                startContent={<Plus size={18} />}
              >
                New Post
              </Button>
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
                  <DropdownItem key="drafts" startContent={<Edit3 size={16} />}>
                    <Link to="/posts/drafts">My Drafts</Link>
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
              className={`block py-2 text-lg font-medium rounded hover:bg-white/10 ${
                location.pathname === item.path ? 'text-primary' : 'text-white'
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
