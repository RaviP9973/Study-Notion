import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../common/IconButton";
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  // Define the consistent button style once to avoid repetition
  const buttonClasses = "flex items-center justify-center gap-x-1 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-100";

  if (!user) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="text-white w-full px-4 md:px-10 flex flex-col gap-y-8 py-10">
      <h1 className="text-3xl md:text-4xl font-semibold">My Profile</h1>

      {/* Section 1 */}
      <div className="flex w-full flex-col gap-4 rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div className="flex items-center gap-x-4">
          <img
            src={`${user.image}`}
            alt={`${user?.firstName}`}
            className="aspect-square w-[60px] rounded-full object-cover sm:w-[78px]"
          />
          <div className="space-y-1">
            <p className="text-lg font-medium text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="truncate text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconButton
            text="Edit"
            onclick={() => navigate("/dashboard/setting")}
            customClasses={buttonClasses}
          >
            <FaRegEdit className="text-lg"/>
        </IconButton>
      </div>

      {/* Section 2 */}
      <div className="flex w-full flex-col gap-y-5 rounded-md border border-richblack-700 bg-richblack-800 p-4 md:p-6">
        <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">About</p>
            <IconButton
                text="Edit"
                onclick={() => navigate("/dashboard/setting")}
                customClasses={buttonClasses}
            >
                <FaRegEdit className="text-lg"/>
            </IconButton>
        </div>
        <p className="text-richblack-300 text-sm">
            {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className="flex w-full flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-4 md:p-6">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconButton
            text="Edit"
            onclick={() => navigate("/dashboard/setting")}
            customClasses={buttonClasses}
          >
            <FaRegEdit className="text-lg"/>
          </IconButton>
        </div>
        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-richblack-400">First Name</p>
            <p className="font-medium text-richblack-5">{user?.firstName}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-richblack-400">Last Name</p>
            <p className="font-medium text-richblack-5">{user?.lastName}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-richblack-400">Email</p>
            <p className="font-medium text-richblack-5">{user?.email}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-richblack-400">Gender</p>
            <p className="font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Not Specified"}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-richblack-400">Phone Number</p>
            <p className="font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add contact Number"}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-richblack-400">Date of Birth</p>
            <p className="font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add your dob"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;