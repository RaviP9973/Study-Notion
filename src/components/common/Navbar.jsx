import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../Assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FaAngleDown } from "react-icons/fa6";

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
  }, [token,user]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={162} loading="lazy" />
        </Link>

        {/* nav links  */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-3 group relative ">
                      <p>{link.title}</p>
                      <FaAngleDown />

                      <div className="invisible opacity-0 absolute left-[50%] top-[50%] z-[1000] flex border-2  translate-x-[-50%] translate-y-[3em] flex-col items-start rounded-lg bg-richblack-5 text-richblack-900  transition-all duration-150 group-hover:visible group-hover:translate-y-[1.75em] group-hover:opacity-100 lg:w-[170px]">
                        {sublinks.length ? (
                          sublinks.map((sublink, index) => (
                            <Link
                              to={`/catalog/${sublink?.name.split(" ").join("-").toLowerCase()}`}
                              key={index}
                              className="py-2 px-3 text-sm font font-semibold w-full rounded-lg hover:bg-richblack-50 transition-all duration-300 z-10"
                            >
                              <p className="">{sublink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                        <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded-md bg-richblack-5 translate-x-[80%] translate-y-[-40%] group-hover:visible "></div>
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="flex gap-x-4 items-center ">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative text-richblack-900 bg-white">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span className="">{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                signup
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
