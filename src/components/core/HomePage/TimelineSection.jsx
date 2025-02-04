import React from "react";
import Logo1 from "../../../Assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../Assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../Assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../Assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../Assets/Images/TimelineImage.png"

const timeLine = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully Commited to the success company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Description: "Fully Commited to the success company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Description: "Fully Commited to the success company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description: "Fully Commited to the success company",
  },
];

const TimelineSection = () => {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row  gap-10 md:gap-0 items-center  ">
        <div className="flex flex-col w-full  md:w-[45%] gap-5">
          {timeLine.map((element, index) => {
            return (
              <div className="flex gap-1" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center">
                  <img src={element.Logo} />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative shadow-blue-200 ">
          <img src={timelineImage} alt="timeline img" className="shadow-white object-cover h-fit"/>



          <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
            <div className="flex items-center gap-5 border-r border-r-caribbeangreen-300 px-7">
                <p className="text-3xl font-bold ">10</p>
                <p className="text-caribbeangreen-300 text-sm">Years of experience</p>
            </div>
            <div className="flex gap-5 items-center px-7">
                <p className="text-3xl font-bold ">250</p>
                <p className="text-caribbeangreen-300 text-sm">Type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
