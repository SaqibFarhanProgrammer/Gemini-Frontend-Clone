import React, { useContext, useState } from "react";
import {
  FaUserCircle,
  FaLightbulb,
  FaCompass,
  FaCode,
  FaMicrophone,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import geminiLogo from "../assets/geminiLogo.png";
import "../components/Main.css";

const MainContent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context);

  const [imageFile, setImageFile] = useState(null);
  const [profileimg, setProfileimg] = useState(null);
  const [active, setactive] = useState("dis-none");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageURL = URL.createObjectURL(file);
      setProfileimg(imageURL);
    }
  };

  const handleUpload = () => {
    if (imageFile) {
      console.log("Uploading:", imageFile.name);
    } else {
      console.log("No file selected");
    }
  };

  const pro_show = () => {
    setactive((prev) => (prev === "dis-visi" ? "dis-none" : "dis-visi"));
  };

  return (
    <div className="main-container">
      <div className="main-header">
        <p>Gemini</p>

        <div
          className="pro-img"
          onClick={pro_show}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {profileimg ? (
            <img
              src={profileimg}
              className="profile-img"
              alt="Profile"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <FaUserCircle style={{ fontSize: "38px", color: "#ccc" }} />
          )}
          <div className={`profile ${active}`}>
            <p>Upload Image</p>
            <input
              className="pro-inp"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="main-inner">
        {!showResult ? (
          <div className="main-greeting">
            <p>
              <span className="gradient-text">Hello, There.</span>
            </p>
          </div>
        ) : (
          <div className="result-section">
            <div className="user-question">
              {profileimg ? (
                <img
                  src={profileimg}
                  className="profile-img"
                  alt="Profile"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaUserCircle style={{ fontSize: "38px", color: "#ccc" }} />
              )}
              <p className="user-text">{recentPrompt}</p>
            </div>

            <div className="ai-response">
              <img src={geminiLogo} alt="" className="gemini-logo" />
              {loading ? (
                <div className="loading">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="result-text"
                ></p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="input-wrapper">
        <div className="input-bar">
          <input
            type="text"
            placeholder="Enter a prompt here..."
            className="prompt-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="input-icons">
            {input && (
              <IoMdSend onClick={() => onSent()} className="input-icon" />
            )}
          </div>
        </div>

        <p className="disclaimer">Made By Saqib Using Gemini API Key</p>
      </div>
    </div>
  );
};

export default MainContent;
