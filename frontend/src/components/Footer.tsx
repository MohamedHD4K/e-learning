import { Link } from 'react-router-dom';
import { Facebook , Linkedin , Github} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Learnify</h2>
          <p className="text-gray-400">
            Empowering your knowledge journey with cutting-edge online courses and personalized learning experiences.
          </p>
          <div className="flex space-x-4">
          <Linkedin/>
          <Facebook/>
          <Github/>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Courses</h3>
          <ul className="space-y-2">
            <li><Link to="/courses/development" className="text-gray-400 hover:text-white transition-colors">Development</Link></li>
            <li><Link to="/courses/design" className="text-gray-400 hover:text-white transition-colors">Design</Link></li>
            <li><Link to="/courses/marketing" className="text-gray-400 hover:text-white transition-colors">Marketing</Link></li>
            <li><Link to="/courses/business" className="text-gray-400 hover:text-white transition-colors">Business</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of use</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy policy</Link></li>
            <li><Link to="/cookie" className="text-gray-400 hover:text-white transition-colors">Cookie policy</Link></li>
            <li><Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; {currentYear} Learnify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;