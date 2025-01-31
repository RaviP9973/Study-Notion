import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import IconButton from '../../../common/IconButton';
import CourseTable from './CourseTable';

const MyCourses = () => {
    const {token} = useSelector((state)=> state.auth);
    const navigate= useNavigate();

    const [courses,setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses = async()=> {
            console.log(token)
            const result = await fetchInstructorCourses(token);
            // console.log(result);
            if(result){
                setCourses(result);
            }
        }
        
        fetchCourses();
    },[])
  return (
    <div className='text-white'>
      <div className='flex justify-between'>
        <h1>My Courses</h1>
        <IconButton 
        text = "Add Course"
        onclick = { () => navigate("/dashboard/add-course")}
        // icon lagana h 
        type="button"
        />
      </div>
      {
        courses && <CourseTable courses={courses} setCourses={setCourses} /> 
      }
    </div>
  )
}

export default MyCourses
