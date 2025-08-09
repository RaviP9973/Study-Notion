import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfimationModal from "../../common/ConfimationModal";
import { FaTimes, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {/* --- Toggle Button --- */}
      <button
        // CORRECTED: Changed 'fixed' to 'absolute' to position it relative to the dashboard area
        className="absolute left-4 top-4 z-50 text-2xl text-richblack-25"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* --- Blurred Background Overlay --- */}
      <div
        className={`fixed inset-0 z-30 bg-richblack-900 bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 
        ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
      ></div>
      
      {/* --- Sidebar Content --- */}
      <div
        className={`z-40 flex h-[calc(100vh-3.5rem)] w-[222px] flex-col border-r border-richblack-700 bg-richblack-800 text-white 
        transition-transform duration-300 ease-in-out fixed -translate-x-full 
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col py-10">
          <div className="flex flex-col">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink onClick={() => setMenuOpen(false)} link={link} iconName={link.icon} key={link.id} />
              );
            })}
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

          <div className="flex flex-col">
            <SidebarLink
              onClick={() => setMenuOpen(false)}
              link={{ name: "Settings", path: "dashboard/setting" }}
              iconName={"VscSettingsGear"}
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure ?",
                  text2: "You will be logged out of your account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfimationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;