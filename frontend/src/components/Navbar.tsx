import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, BookOpen, Home, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          {isMenuOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/" className="flex items-center gap-2" onClick={toggleMenu}><Home size={18} />Home</Link></li>
              <li><Link to="/courses" className="flex items-center gap-2" onClick={toggleMenu}><BookOpen size={18} />Courses</Link></li>
              <li><Link to="/login" className="flex items-center gap-2" onClick={toggleMenu}><LogIn size={18} />Login</Link></li>
              <li><Link to="/signup" className="flex items-center gap-2" onClick={toggleMenu}><User size={18} />Sign Up</Link></li>
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <span className="text-primary font-bold">Learn</span>
          <span className="text-secondary">ify</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className="flex items-center gap-2"><Home size={18} />Home</Link></li>
          <li><Link to="/courses" className="flex items-center gap-2"><BookOpen size={18} />Courses</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn btn-ghost mr-2">Login</Link>
        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
      </div>
    </div>
  );
};

export default Navbar;