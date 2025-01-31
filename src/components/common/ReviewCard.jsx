import React from 'react'

const ReviewCard = ({review}) => {

  return (
    <div className='  bg-richblack-500 p-3 rounded-md'>
        <div className='flex gap-2 items-center' >
            <img src={review?.user?.image} alt=""  className='aspect-square w-12 rounded-full object-cover '/>
            <div className='flex gap-2'>
                <p>{review?.user?.firstName}</p>
                <p>{review?.user?.lastName}</p>
            </div>
        
        </div>
    </div>
  )
}

export default ReviewCard
