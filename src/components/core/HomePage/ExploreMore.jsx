import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

  const [currentTab,setCurrentTab] = useState(tabsName[0]);
  const [courses,setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

  const setMyCards=(value)=>{
    setCurrentTab(value);
    const result = HomePageExplore.filter((course)=> course.tag === value);
    setCurrentCard(result[0].courses[0].heading);
    setCourses(result[0].courses);
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="text-4xl font-semibold text-center">
        Unlock the <HighlightText text={"Power of Code"}/>
      </div>

      <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'  > Learn to build anything you can imagine</p>

      <div className='flex flex-row bg-richblack-800 mb-7 border-richblack-100 px-1 py-1 rounded-full gap-1 w-fit '>
        {
          tabsName.map((element,index)=>{
            return (
              <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ?"bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-300  hover:bg-richblack-900 cursor-pointer hover:text-richblack-5 px-7 py-2`} key={index} onClick={()=> setMyCards(element)}>
{element}
              </div>
            )
          })
        }
      </div>

      <div className="lg:h-[150px] ">
        <div className='flex gap-5 justify-between '>
          {
            courses.map((element,index)=>{
              return (
                <CourseCard key={index}
                cardData = {element}
                currentCard={currentCard}
                setCurrentCard = {setCurrentCard}/>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

export default ExploreMore
