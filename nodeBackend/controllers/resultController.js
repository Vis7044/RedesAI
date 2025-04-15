// nodeBackend/controllers/resultController.js
const Result = require("../models/resultModel");
const User = require("../models/userModel");

// exports.getResult=async(req,res)=>{
//     try {
//         const {videoId} = req.params;
//         const result = await Result.findOne({videoId});
//         if(!result){
//             return res.status(404).json({message:"Result not found"});
//         }
//         res.status(200).json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message:"Server error"});
//     }
// }

exports.addResult = async (req, res) => {
  try {
    const { videoId, videoName, resultStatus } = req.body;
    if (!videoId || !videoName || !resultStatus) {
      return res.status(400).json({
        message: "Please provide videoId, videoName and resultStatus",
      });
    }
    const result = new Result({
      videoId,
      videoName,
      resultStatus,
    });
    await result.save();
    const video = await Result.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Result not found" });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.result.push(video._id);
    await user.save();
    return res.status(201).json({
      message: "Result added successfully",
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    console.log(req.body);
    const { vidId } = req.body;
    const result = await Result.findOneAndDelete({ _id: vidId });
    if (!result) {
      return res
        .status(400)
        .json({ message: "Result not found", success: false });
    }
    const user = await User.findById(req.userId);
    user.result = user.result.filter(
      (item) => item.toString() !== result._id.toString()
    );
    await user.save();
    res
      .status(200)
      .json({ message: "Result deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { videoName, resultStatus } = req.body;
    if (!videoName || !resultStatus) {
      return res.status(400).json({
        message: "Please provide videoName and resultStatus",
      });
    }
    const result = await Result.findOneAndUpdate(
      { videoId },
      { videoName, resultStatus },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.status(200).json({ message: "Result updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addfav = async (req, res) => {
  try {
    const { vidId } = req.body;
    console.log(req.body);
    console.log(vidId);
    const video = await Result.findById(vidId);
    video.favourite = !video.favourite;
    await video.save();
    return res.status(200).json({
      message: "Added to fav",
      data: video,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
