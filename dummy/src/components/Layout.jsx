import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <footer className="w-full bg-gray-900 py-6 text-gray-300">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Tagline or Site Info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; 2024 Acme Inc. All rights reserved.</p>
            <p>Engage in meaningful conversations and make a difference.</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
