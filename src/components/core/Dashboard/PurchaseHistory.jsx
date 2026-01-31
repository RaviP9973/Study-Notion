import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { formatDate } from "../../../services/formatDate";
import { useNavigate } from "react-router-dom";
import { VscHistory } from "react-icons/vsc";
import { HiOutlineShoppingBag } from "react-icons/hi";

const PurchaseHistory = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [purchaseHistory, setPurchaseHistory] = useState(null);
  const navigate = useNavigate();

  const getPurchaseHistory = async () => {
    setLoading(true);
    try {
      const response = await getUserEnrolledCourses(token);
      // Sort by most recent purchases first (assuming course has createdAt)
      const sortedCourses = response?.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPurchaseHistory(sortedCourses);
    } catch (error) {
      console.log("Unable to fetch purchase history", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-richblack-700 p-8 rounded-full mb-6">
        <HiOutlineShoppingBag className="text-6xl text-richblack-300" />
      </div>
      <h2 className="text-2xl font-semibold text-richblack-5 mb-3">
        No Purchase History Yet
      </h2>
      <p className="text-richblack-300 text-center mb-6 max-w-md">
        You haven't purchased any courses yet. Start exploring our courses and begin your learning journey today!
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-100 transition-all duration-200"
      >
        Browse Courses
      </button>
    </div>
  );

  return (
    <div className="text-white min-h-[calc(100vh-3.5rem)]">
      <div className="mb-8">
        <p className="text-sm text-richblack-300 mb-2">
          Home / Dashboard / <span className="text-yellow-50">Purchase History</span>
        </p>
        <div className="flex items-center gap-3">
          <VscHistory className="text-3xl text-yellow-50" />
          <h1 className="text-3xl font-semibold text-richblack-5">Purchase History</h1>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="loader"></div>
        </div>
      ) : !purchaseHistory || purchaseHistory.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          <div className="bg-richblack-800 border border-richblack-700 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-richblack-700 border-b border-richblack-600 text-richblack-100 text-sm font-medium">
              <div className="col-span-5">Course</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Purchase Date</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-richblack-700">
              {purchaseHistory.map((course, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-richblack-700 transition-all duration-200"
                >
                  {/* Course Info */}
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-medium text-richblack-5 line-clamp-1">
                        {course.name}
                      </h3>
                      <p className="text-xs text-richblack-300 line-clamp-1">
                        by {course.instructor?.firstName} {course.instructor?.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 flex items-center justify-center">
                    <span className="text-yellow-50 font-semibold">
                      ₹{course.price}
                    </span>
                  </div>

                  {/* Purchase Date */}
                  <div className="col-span-3 flex items-center justify-center">
                    <span className="text-richblack-100 text-sm">
                      {formatDate(course.createdAt)}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="col-span-2 flex items-center justify-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/view-course/course/${course._id}/section/${course.courseContent?.[0]?._id}/subSection/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                      }
                      className="bg-richblack-700 text-yellow-50 px-4 py-2 rounded-md text-sm font-medium hover:bg-richblack-600 transition-all duration-200 border border-richblack-600"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-richblack-5 mb-4">
              Purchase Summary
            </h2>
            <div className="flex justify-between items-center mb-3">
              <span className="text-richblack-300">Total Courses Purchased:</span>
              <span className="text-richblack-5 font-semibold">
                {purchaseHistory.length}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-richblack-700">
              <span className="text-richblack-300">Total Amount Spent:</span>
              <span className="text-yellow-50 font-bold text-xl">
                ₹
                {purchaseHistory.reduce(
                  (total, course) => total + (course.price || 0),
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
