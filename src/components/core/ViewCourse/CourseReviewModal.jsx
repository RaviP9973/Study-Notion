import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import IconButton from '../../common/IconButton';
import { createRating } from '../../../services/operations/courseDetailsAPI';


const CourseReviewModal = ({setReviewModal}) => {
  const {user} = useSelector((state)=> state.profile)
  const {token} = useSelector((state)=> state.auth)
  const {courseEntireData} = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  } = useForm();
  
  useEffect(()=>{
    setValue("courseExperience", "");
    setValue("courseRating",0);
  },[])

  const onSubmit = async(data) => {
    console.log("data",data)
    await createRating({
      courseId:courseEntireData._id,
      rating:data.courseRating,
      review:data.courseExperience,
    },token) 
    setReviewModal(false);
  }

  const ratingChanged = (newRating)=>{
    setValue("courseRating",newRating);
  }
  return (
    <div className='text-white bg-richblack-500'>
      <div>
        {/* Modal header */}
        <div>
          <p>Add review</p>
          <button
          onClick={()=>setReviewModal(false)}
          >close</button>
        </div>

        {/* modal body */}
        <div>
          <div>
            <img src={user?.image} alt="instructor" className='aspect-square w-8 rounded-full object-cover'/>
            <div>
              <p>{user?.firstName} {user?.lastName}</p>
              <p>posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}
          className='mt-6 flex flex-col items-center'
          >
            <ReactStars
              count = {5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />

            <div>
              <label htmlFor="courseExperience">Add Your Experience</label>
              <textarea name="" id="courseExperience"
              placeholder='Add your experience here'

              {...register("courseExperience",{required:true})}

              className='form-style min-h-[130px] w-full'
              ></textarea>
              {
                errors.courseExperience && (
                  <span>
                    Please add your course experience
                  </span>
                )
              }
            </div>

            <div>
              <button onClick={()=>setReviewModal(false)}>Cancel</button>
              <IconButton text="save"
              /> 
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal
