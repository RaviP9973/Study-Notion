import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

    const buttonRef = useRef(null);

  // Custom click outside handler that excludes the button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current && 
        !ref.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);
  // useOnClickOutside(ref, () => setOpen(false));
  return (
    <button 
      ref={buttonRef}
      className="relative w-full lg:w-auto" 
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
    >      <div className="flex items-center gap-x-3 px-3 py-2 rounded-md hover:bg-richblack-800 transition-all duration-300 w-full lg:w-auto">
        <img
          src={user?.image}
          alt="profile picture"
          className="aspect-square w-[32px] rounded-full object-cover border-2 border-richblack-600"
        />
        <div className="flex flex-col items-start lg:hidden">
          <p className="text-sm font-medium text-richblack-5">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-richblack-300">{user?.email}</p>
        </div>
        <AiOutlineCaretDown className={`text-sm text-richblack-100 transition-transform duration-300 ${open ? 'rotate-180' : ''} ml-auto lg:ml-0`} />
      </div>

      {open && (
        <div
          className="absolute top-[110%] left-0 right-0 lg:right-0 lg:left-auto z-[1000] lg:min-w-[220px] overflow-hidden rounded-lg border border-richblack-600 bg-richblack-800 shadow-xl backdrop-blur-sm"
          ref={ref}
        >
          <div className="px-4 py-3 border-b border-richblack-600 bg-richblack-700 lg:block hidden">
            <p className="text-sm font-medium text-richblack-5">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-richblack-300">{user?.email}</p>
          </div>
          
          <Link to="/dashboard/my-profile" onClick={()=>setOpen(false)}>
            <div className="flex w-full items-center gap-x-3 py-3 px-4 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-yellow-50 transition-all duration-200">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          
          <div onClick={()=>{
            dispatch(logout(navigate));
            setOpen(false);
          }} 
          className="flex w-full items-center gap-x-3 py-3 px-4 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-red-400 transition-all duration-200 cursor-pointer border-t border-richblack-600"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropDown;
