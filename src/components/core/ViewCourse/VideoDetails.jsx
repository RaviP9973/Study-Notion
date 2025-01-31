import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ControlBar, Player } from "video-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import {
  BigPlayButton,
  LoadingSpinner,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
  CurrentTimeDisplay,
  TimeDivider,
} from "video-react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import IconButton from "../../common/IconButton";
// import '~video-react/dist/video-react.css';

const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const location = useLocation();

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subsectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        // console.log("courseSectionData", courseSectionData);
        if (sectionId) {
          const filteredData = courseSectionData.filter(
            (course) => course._id === sectionId
          );
          // console.log("filteredData",filteredData)
          const filteredVideoData = filteredData?.[0].subSection.filter(
            (data) => data._id === subsectionId
          );

          setVideoData(filteredVideoData[0]);
          setVideoEnded(false);
        }
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  //first video
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === sectionId);

    if (currentSectionIndex === 0 && currentSubsectionIndex === 0) return true;
    else return false;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === sectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubsectionIndex ===
        courseSectionData[currentSectionIndex].subSection.length - 1
    )
      return true;
    else return false;
  };

  const goToNextVideo = () => {
    console.log("inside the go to next");
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === sectionId);

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubsectionIndex !== noOfSubSections - 1) {
      console.log("something", courseSectionData[currentSectionIndex]);
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex + 1
        ]._id;

      navigate(
        `/view-course/course/${courseId}/section/${sectionId}/subsection/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const firstSubsectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/course/${courseId}/section/${nextSectionId}/subSection/${firstSubsectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === sectionId);

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubsectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex - 1
        ]._id;

      navigate(
        `/view-course/course/${courseId}/section/${sectionId}/subsection/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const lastSubsectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          courseSectionData[currentSectionIndex - 1].subSection.length - 1
        ]._id;

      navigate(
        `/view-course/course/${courseId}/section/${prevSectionId}/subSection/${lastSubsectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    // yaha kam krna h abhi
    setLoading(true);

    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subsectionId: subsectionId,
      },
      token
    );

    if (res) dispatch(updateCompletedLectures(subsectionId));

    setLoading(false);
  };
  return (
    <div className="text-white">
      {!videoData ? (
        <div>No data found</div>
      ) : (
        <div>
          <Player
            className="w-full relative"
            ref={playerRef}
            src={videoData.videoUrl}
            aspectRatio="16:9"
            fluid={true}
            autoPlay={false}
            onEnded={() => setVideoEnded(true)}
          >
            <BigPlayButton position="center" />

            <LoadingSpinner />
            <ControlBar>
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
              <ReplayControl seconds={5} order={7.1} />
              <ForwardControl seconds={5} order={7.2} />
              <TimeDivider order={4.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
            </ControlBar>
            <TimeDivider order={4.2} />
            <MdOutlinePlayCircleFilled />
            {videoEnded && (
              <div>
                {!completedLectures.includes(subsectionId) && (
                  <IconButton
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark as complete" : "Loading..."}
                    customClasses={"bg-yellow-50"}
                  />
                )}
                <IconButton
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      playerRef.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text={"Rewatch"}
                  customClasses={"text-xl"}
                />
                <div>
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="bg-yellow-50"
                    >
                      Prev
                    </button>
                  )}

                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="bg-yellow-50"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}
      <h1>{videoData?.title}</h1>
      <p>{videoData?.description}</p>p
    </div>
  );
};

export default VideoDetails;
