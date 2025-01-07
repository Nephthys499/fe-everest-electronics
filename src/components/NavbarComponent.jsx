import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Image } from '@nextui-org/react';
import { useState } from 'react';
import LogoEverest from '../assets/LogoProfile.png';

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'BERANDA', href: '#' },
    { name: 'PEMESANAN', href: '#pemesanan' },
    { name: 'DAFTAR CLIENT KAMI', href: '#daftar-client-kami' },
    { name: 'TENTANG KAMI', href: '#tentang-kami' },
    { name: 'TESTIMONI', href: '#testimoni' },
    { name: 'BERITA', href: '#berita' },
  ];

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image 
              src={LogoEverest} 
              alt="Logo" 
              width={30} 
              height={30}
              radius="none"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">Everest Electronics</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              {link.name}
            </a>
          ))}
          <button className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
