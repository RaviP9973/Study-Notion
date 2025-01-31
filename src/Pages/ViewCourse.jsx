import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { fetchAllCourseDetails } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(null);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("yaha aa kyu ni raha be ?")
    const setCourseSpecificDetails = async () => {
      // console.log("phle yaha aaye ?")
      setLoading(true);
      const courseData = await fetchAllCourseDetails(courseId, token);
      console.log("courseData", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseContent?.forEach((element) => {
        lectures += element.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));

      setLoading(false);
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex">
          <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
          </div>
          <div className="h-[calc(100vh-3.5rem)] overflow-auto border-2 w-full">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
