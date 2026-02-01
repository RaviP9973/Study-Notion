import { useEffect, useRef, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../Assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FaAngleDown } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import useOnClickOutside from "../../hooks/useOnClickOutside";
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [sublinks, setSublinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log(result);
      setSublinks(result.data.data);
      // console.log(sublinks);
    } catch (error) {
      console.log("could not fetch the category list");
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, [token, user]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const ref = useRef(null);
  const buttonRef = useRef(null);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown when menu closes
  useEffect(() => {
    if (!menuOpen) {
      setDropdownOpen(false);
    }
  }, [menuOpen]);

  // Handle nav link click
  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  // Handle menu toggle with proper event handling
  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current && 
        !ref.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);
  return (
    <div className=" fixed top-0 left-0 right-0 z-[999] flex h-14  items-center justify-center border-b border-b-richblack-700 bg-richblack-900">
      <div className="flex flex-row w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={162} loading="lazy" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          className="lg:hidden text-richblack-25 text-2xl z-[1000] relative transition-transform duration-300 hover:scale-110"
          onClick={handleMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <span className={`transition-all duration-300 ${menuOpen ? 'rotate-180' : 'rotate-0'}`}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </span>
        </button>
        
        {/* Nav Links */}
        <nav
          className={`lg:flex lg:flex-row lg:static lg:w-auto lg:bg-transparent lg:items-center
            ${menuOpen 
              ? "fixed top-14 right-0 w-72 h-[calc(100vh-3.5rem)] bg-richblack-900/98 backdrop-blur-lg border-l border-richblack-700 flex flex-col items-start justify-start pt-6 px-6 transform translate-x-0 opacity-100 z-[999] shadow-2xl" 
              : "fixed top-14 right-0 w-72 h-[calc(100vh-3.5rem)] bg-richblack-900/98 backdrop-blur-lg border-l border-richblack-700 flex flex-col items-start justify-start pt-6 px-6 transform translate-x-full opacity-0 z-[999] shadow-2xl"
            } 
            lg:transform-none lg:opacity-100 lg:relative lg:top-auto lg:right-auto lg:w-auto lg:h-auto lg:bg-transparent lg:backdrop-blur-none lg:pt-0 lg:px-0 lg:border-none lg:shadow-none
            transition-all duration-300 ease-in-out`}
          ref={ref}
        >
          <ul className="flex flex-col gap-6 w-full lg:w-auto lg:flex-row lg:gap-x-6 lg:gap-y-0 text-richblack-25 items-start lg:items-center">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative group w-full lg:w-auto">
                {link.title === "Catalog" ? (
                  <div className="relative">
                    <div
                      className="flex flex-row items-center justify-between lg:justify-center gap-2 px-3 py-2 text-white cursor-pointer transition-all duration-300 hover:text-yellow-50 hover:bg-richblack-800 lg:hover:bg-transparent rounded-lg lg:rounded-none w-full lg:w-auto"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <p className="font-medium">{link.title}</p>
                      <FaAngleDown className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''} lg:group-hover:rotate-180`} />
                    </div>
                    <div
                      className={`
                        ${menuOpen ? 'relative' : 'absolute'} 
                        ${menuOpen ? 'left-0 mt-2' : 'left-1/2 transform -translate-x-1/2 lg:left-0 lg:transform-none top-full mt-2'} 
                        w-full lg:w-[200px] bg-richblack-5 text-richblack-900 rounded-lg shadow-xl border border-richblack-200
                        transition-all duration-300 ease-in-out
                        ${dropdownOpen 
                          ? 'opacity-100 visible translate-y-0 max-h-60' 
                          : 'opacity-0 invisible -translate-y-2 max-h-0 lg:max-h-60'
                        }
                        ${!menuOpen ? 'lg:invisible lg:group-hover:visible lg:group-hover:opacity-100 lg:group-hover:translate-y-0' : ''}
                        flex flex-col overflow-hidden z-[1000]`}
                    >
                      {sublinks.length ? (
                        sublinks.map((sublink, index) => (
                          <Link
                            to={`/catalog/${sublink?.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                            className="block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-richblack-100 hover:text-richblack-900 border-b border-richblack-100 last:border-b-0"
                            onClick={() => {
                              handleNavLinkClick();
                            }}
                          >
                            {sublink.name}
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-richblack-600">
                          No categories available
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className="block w-full px-3 py-2 text-white transition-all duration-300 hover:text-yellow-50 hover:bg-richblack-800 lg:hover:bg-transparent rounded-lg lg:rounded-none"
                    onClick={handleNavLinkClick}
                  >
                    <p className={`font-medium ${location.pathname.endsWith(link.path) ? "text-yellow-50" : "text-richblack-25"} transition-colors duration-300`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Auth Section */}
          <div className="flex flex-col gap-4 w-full lg:w-auto lg:flex-row lg:gap-x-4 lg:items-center mt-8 lg:mt-0 lg:ml-6">
            {user && user.accountType !== "Instructor" && (
              <Link 
                to="/dashboard/cart" 
                className="relative flex justify-center lg:justify-start text-richblack-900"
                onClick={handleNavLinkClick}
              >
                <FaCartArrowDown size={24} className="text-richblack-5 hover:text-yellow-50 transition-colors duration-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full bg-red-600 text-yellow-50 text-xs font-semibold animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null ? (
              <div className="flex flex-col gap-3 w-full lg:w-auto lg:flex-row lg:gap-3">
                <Link to="/login" onClick={handleNavLinkClick}>
                  <button className="w-full lg:w-auto border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-700 transition-all duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={handleNavLinkClick}>
                  <button className="w-full lg:w-auto border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-700 transition-all duration-300">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div className="w-full lg:w-auto">
                <ProfileDropDown />
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 z-[900] transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleNavLinkClick}
      ></div>
    </div>
  );
};

export default Navbar;
