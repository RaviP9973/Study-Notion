import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { fetchAllCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice";
const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      // console.log("courseId", courseId);
      const result = await fetchAllCourseDetails(courseId, token);
      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.courseDetails));
        dispatch(setStep(1));
      }

      setLoading(false);
    };

    populateCourseDetails();
  }, [courseId, token, dispatch]);

  return (
    <div>
      <h1>Edit course</h1>
      <div>{course ? <RenderSteps /> : <p>Course not found</p>}</div>
    </div>
  );
};

export default EditCourse;
