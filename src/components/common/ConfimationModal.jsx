import React, { useEffect, useRef, useState } from 'react'
import IconBtn from './IconButton'
import useOnClickOutside from '../../hooks/useOnClickOutside'
// import React from 'react';
// import useOnClickOutside from '../../hooks/useOnClickOutside';

const ConfirmationModal = ({modalData}) => {

    useEffect(()=> {
        console.log("modalData" ,modalData);
    },[])
  // const [open,setOpen] = useState(false);
  const ref = useRef(null);
  // useState(() => {
  //   setOpen(true);
  // },[])

  useOnClickOutside(ref, () => modalData.btn2Handler());

  return (
      (
        <div >
      
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2' ref={ref}>
            <p className='text-2xl font-semibold text-richblack-5'>
                {modalData.text1}
            </p>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>
                {modalData.text2}
            </p>
            <div className='flex items-center gap-x-4'>
                <IconBtn 
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    />
                <button className='flex items-center bg-richblack-200 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 undefined' onClick={modalData?.btn2Handler}>
                    {modalData?.btn2Text}
                </button>    
            </div>
        </div>

        <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over'></div>
      
    </div>
      )
    
  )
}

export default ConfirmationModal