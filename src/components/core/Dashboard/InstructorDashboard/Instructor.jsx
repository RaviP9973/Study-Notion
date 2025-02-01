import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);
      const instructorApiData = await getInstructorData(token);
      console.log("instructor api data", instructorApiData);

      if (instructorApiData) {
        setInstructorData(instructorApiData);
      }
      if (result) {
        setCourses(result);
      }

      setLoading(false);
    };

    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );
  return (
    <div className="text-white">
      <div>
        <h1>Hi {user?.firstName}</h1>
        <p>Let's start something new</p>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : courses.length > 0 ? (
        <div>
          <div>
            <div>
              <InstructorChart courses={instructorData} />
              <div>
                <p>Statistics</p>
                <div>
                  <p>Total Courses</p>
                  <p>{courses.length}</p>
                </div>

                <div>
                  <p>Total Students</p>
                  <p>{totalStudents}</p>
                </div>
                <div>
                  <p>Total income</p>
                  <p>{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* render courses */}
            <div>
              <p>Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p>View all</p>
              </Link>
            </div>
            <div>
              {courses.slice(0, 3).map((course) => (
                <div key={course._id}>
                  <img src={course.thumbnail} alt="" />
                  <div>
                    <p>{course.name}</p>

                    <div>
                      <p>{course.studentEnrolled.length} students</p>
                      <p> | </p>
                      <p>Rs {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not created any courses yet</p>
          <Link to="dashboard/addCourse">Create a course</Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
