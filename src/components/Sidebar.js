import { useSelector } from "react-redux";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [todayFiles, setTodayFiles] = useState([]); // Initialize with an empty array
  const [previousFiles, setPreviousFiles] = useState([]); // Initialize with an empty array

  const formattedTodayDate = new Date().toISOString().split("T")[0];
  const apiURL = process.env.REACT_APP_API_URL;

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${apiURL}/files`);
      console.log("API Response:", response.data);
      const files = response.data.files || []; // Ensure files is an array
      setTodayFiles(
        files.filter(
          (file) => file.uploadedAt.split("T")[0] === formattedTodayDate,
        ),
      );
      setPreviousFiles(
        files.filter(
          (file) => file.uploadedAt.split("T")[0] !== formattedTodayDate,
        ),
      );
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const getFileIcon = (type) => {
    switch (type) {
      case "application/pdf":
        return "📄";
      case "application/doc":
      case "application/docx":
        return "📝";
      default:
        return "📃";
    }
  };

  return (
    <div className="hidden lg:flex w-full lg:w-[15vw] bg-gray-100 min-h-screen h-full flex-col gap-4 px-4">
      <Logo />
      <div className="flex justify-center">
        <Link
          to="/upload-file"
          className="bg-black px-8 py-1 rounded-lg text-white text-sm"
        >
          {" "}
          + Create New
        </Link>
      </div>

      {/* Show uploaded files */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-left">My Files</p>

        {/* Today */}
        <div>
          <p className="text-sm text-black font-semibold mb-2 text-left">
            Today
          </p>

          {todayFiles.length > 0 ? (
            todayFiles.map((file, index) => (
              <div
                key={index}
                className="flex text-left items-center gap-2 p-2 mb-2 hover:bg-gray-400 transition text-sm rounded-lg cursor-pointer w-full"
              >
                <span className="flex-shrink-0">{getFileIcon(file.type)}</span>

                {/*Handles long names*/}
                <span className="truncate w-full">{file.name}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No files today</p>
          )}
        </div>

        {/* Previous */}
        <div>
          <p className="text-sm text-black font-semibold mb-2 text-left">
            Previous Files
          </p>

          {previousFiles.length > 0 ? (
            previousFiles.map((file, index) => (
              <div
                key={index}
                className="flex text-left items-center gap-2 p-2 mb-2 hover:bg-gray-400 transition cursor-pointer text-sm rounded-lg w-full"
              >
                <span className="flex-shrink-0">{getFileIcon(file.type)}</span>

                {/*Handles long names */}
                <span className="truncate w-full">{file.name}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No previous files</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
