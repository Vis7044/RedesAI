// nodeBackend/controllers/resultController.js
const Result = require("../models/resultModel");
const User = require("../models/userModel");
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

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
    console.log("Video details");
    console.log(videoId, "Video Name: ", videoName, "vide res", resultStatus);

    if (!videoId || !videoName || !resultStatus) {
      return res.status(400).json({
        success: false,
        message: "Please provide videoId, videoName and resultStatus",
      });
    }

    // Check if result with videoId already exists
    let result = await Result.findOne({ videoId });

    if (result) {
      // Update existing result
      result.videoName = videoName;
      result.resultStatus = resultStatus;
      await result.save();
    } else {
      // Create new result
      result = new Result({ videoId, videoName, resultStatus });
      await result.save();
    }

    // Link result to user
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.result.includes(result._id)) {
      user.result.push(result._id);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Result added successfully",
      video: result,
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

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.suggestion = async (req, res) => {
  const { prompt } = req.body;

  try {
    const config = {
      temperature: 1.1,
      responseMimeType: "application/json", // Keep text/plain
    };

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const model = "gemini-2.0-flash";
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No suggestion generated");
    }

    // Try parsing the text as JSON
    const suggestion = JSON.parse(generatedText);

    res.status(200).json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate suggestion" });
  }
};
