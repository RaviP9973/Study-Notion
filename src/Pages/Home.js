import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../Assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstrucrtorSection from "../components/core/HomePage/InstrucrtorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"} className="mt-16 h-fit w-fit">
          <div className="group p-1 mx-auto rounded-full  bg-richblack-800 font-bold text-richblack-200 transition-all duration-300 hover:scale-95">
            <div className="flex flex-row  items-center rounded-full px-10 py-[5px] group-hover:bg-richblack-900 gap-2 ">
              <p>Become an Instructor</p>
              <FaArrowRightLong />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-8">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className="w-[90%] text-center font-bold text-lg text-richblack-300 mt-4">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className="mx-3 my-12 shadow-blue-200 w-[70%] relative">
          <div className="grad2 -top-10 w-[70%]"></div>
          <video muted loop autoPlay className="video">
            <source src={Banner} type="video/mp4"></source>
          </video>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it YourSelf",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n
<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/\n">Two</a><ahref="three/">Three</a>\n</nav>\n`}
            codeColor={"text-yellow-25"}
            backgroundGradient={"grad"}
          />
        </div>
        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"coding in seconds"} />
                with our online courses
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Try it YourSelf",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n
<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/\n">Two</a><ahref="three/">Three</a>\n</nav>\n`}
            codeColor={"text-yellow-25"}
            backgroundGradient={"grad2"}
          />
        </div>

        <ExploreMore/>
      </div>

      {/* section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white mt-5">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-3 items-center">
                  Explore Full Catalog
                  <FaArrowRightLong />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 ">
          <div className="flex flex-row gap-5 mb-10 mt-20">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"job that is in demand"}></HighlightText>
            </div>
            <div className="flex flex-col gap-10 w-[45%] text-[16px] items-start">
              <div>
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
          


        <TimelineSection/>
        <LearningLanguageSection/>
        </div>

      </div>
      {/* section 3 */}
      
      <div className=" w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mb-5">
        <InstrucrtorSection/>
        <h2 className="text-center text-4xl font-semibold mt-10 ">Review from Learners</h2>

      </div>
      <div className="w-11/12 mx-auto mb-10">
        <ReviewSlider />

      </div>
      {/* footer */}
      <Footer/>
    </div>
  );
};

export default Home;
