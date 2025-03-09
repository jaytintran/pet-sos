import { Link } from "react-router-dom";
import { PawPrint as Paw, PlusCircle, Search, LogIn, User } from "lucide-react";

// Assuming we're receiving isAuthenticated as a prop
// You might get this from a context, Redux, or auth service in a real app
const Navbar = ({ isAuthenticated = false }) => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg w-full">
      <div className="px-4 md:px-8 lg:px-12 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Paw className="h-8 w-8" />
            <span className="text-xl font-bold">PetSOS</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/search" className="hover:text-indigo-200">
              <Search className="h-6 w-6" />
            </Link>
            <Link to="/report" className="hover:text-indigo-200">
              <PlusCircle className="h-6 w-6" />
            </Link>
            {isAuthenticated ? (
              <Link to="/profile" className="hover:text-indigo-200">
                <User className="h-6 w-6" />
              </Link>
            ) : (
              <Link to="/login" className="hover:text-indigo-200">
                <LogIn className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
