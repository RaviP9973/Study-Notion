import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../../common/IconButton";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm();
  const { course } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (course?.status === "Published") {
      setValue("public", true);
    } else {
      setValue("public", false);
    }
  }, []);

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");

  };

  const handleCoursePublish = async() => {
    if (
      (course?.status === "Published" && getValues("public") === true) ||
      (course.status === "Draft" && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId",course._id);

    const courseStatus = getValues("public") ? "Published" : "Draft";

    formData.append("status",courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData,token);

    if(result){
        goToCourses();
    }

    setLoading(false);
  };
  const onSubmit = () => {
  handleCoursePublish();
  };

  const goBack = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="rounded-md border bg-richblack-800">
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              {...register("public", { required: true })}
            />
            <span className="ml-3">Make this Course as Public</span>
          </label>
        </div>
        <div>
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className=""
          >
            Back
          </button>

          <IconButton disabled={loading} text={"save changes"} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
