import React, { useContext, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { Context } from "../context/Context";
import "../components/Side.css";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat, darkMode } =
    useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar-container ${darkMode ? "dark" : ""}`}>
      <div>
        <IoMenu onClick={() => setExtended(!extended)} className="menu" />

        <div onClick={newChat} className="new-chat">
          <FaPlus className="text-2xl" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent-section">
            <p className="recent-title">Recent</p>

            {prevPrompt?.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="prompt-item"
              >
                <FaMessage className="prompt-icon text-2xl" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom-section">
        <div className="bottom-item">
          <FaQuestion className="text-2xl" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item">
          <MdHistory className="text-2xl" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item">
          <IoSettings className="text-2xl" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
