const Subsection = require("../models/Subsection");
const Section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubsection = async (req, res) => {
  try {
    //fetch data from req.body
    const { sectionId, title, description} = req.body;
    
    // fetch video
    const video = req.files.video;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }
    

    const sectionDetails = await Section.findById(sectionId);

    if(!sectionDetails){
      return res.status(404).json({
        success:false,
        message:"This Section doesn't exits",

      })
    }

    //upload video to cloudinary and fetch the secure url
    const videoDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    console.log(videoDetails)
    // create subsection
    const subsectionDetails = await Subsection.create({
      title: title,
      description: description,
      timeDuration:videoDetails.duration,
      videoUrl: videoDetails.secure_url,
    });
    //update section with subsection id

    const section = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subsectionDetails._id,
        },
      },
      {
        new: true,
      }
    ).populate("subSection");

    // hw : log updated section here, after adding populate query
    // return response

    // console.log(courseDetails);
    return res.status(200).json({
      success: true,
      message: "sub section created successfully",
      data:section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subsectionId, title, description } = req.body;
    if(!req.files || !req.files.video){
      return res.status(400).json({
        success:false,
        message:"Please select a video",
      })
    }
    console.log("subsection id ",subsectionId);
    const video = req.files.video;
    if (!title || !description || !video || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }
    const videoDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    const updatedSubsection = await Section.findByIdAndUpdate(
      { _id: subsectionId },
      {
        title: title,
        description: description,
        videoUrl: videoDetails.secure_url,
      },
      {
        new: true,
      }
    );
    console.log(updatedSubsection);
    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data:updatedSubsection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error: error.message,
    });
  }
};

//try krna h

exports.deleteSubSection = async (req, res) => {
  try {
    const { subsectionId, sectionId } = req.body;
    console.log("subsection " ,subsectionId);
    console.log("sectionId",sectionId);
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subsection: subsectionId,
        },
      }
    );

    const subsection = await Subsection.findByIdAndDelete({
      _id: subsectionId,
    });

    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.json({
      success: true,
      message: "Subsection Deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
}
