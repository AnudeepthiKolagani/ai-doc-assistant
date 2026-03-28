import { Check, CloudUpload, File, X } from "lucide-react";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const inputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inValidFiles, setInValidFiles] = useState([{}]);
  const [progress, setProgress] = useState(0);

  const MAX_SIZE = 2 * 1024 * 1024;
  const apiURL = process.env.REACT_APP_API_URL;

  const allowedTypes = ["application/pdf", "text/plain", "application/msword"];

  useEffect(() => {
    handleAddFiles();
  }, [selectedFiles]);

  const handleAddFiles = async () => {
    if (selectedFiles.length === 0) return;

    // Creating form data
    const formData = new FormData();
    selectedFiles.forEach((selectedFile) =>
      formData.append("file", selectedFile),
    );

    const res = await axios.post(`${apiURL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (ProgressEvent) => {
        const percentComplated = Math.round(
          (ProgressEvent.loaded * 100) / ProgressEvent.total,
        );
        setProgress(percentComplated);
      },
    });
  };

  const handleBrowseFiles = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const validFiles = [];
    setInValidFiles([]);

    //Converting Object to Array
    const files = Array.from(e.target.files);
    console.log(files);
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setInValidFiles((prev) => [
          ...prev,
          {
            name: file.name,
            error: "not a supported file type",
          },
        ]);
        continue;
      }

      if (file.size > MAX_SIZE) {
        setInValidFiles((prev) => [
          ...prev,
          {
            name: file.name,
            error: "exceeds size limit",
          },
        ]);
        continue;
      }

      validFiles.push(file);
    }
    console.log("valid files", validFiles);
    if (validFiles.length === 0) return;
    setSelectedFiles(validFiles);
  };

  return (
    <div className="px-4 md:px-6 py-2 min-h-screen">
      <Logo />

      <div className="flex flex-col gap-4 mx-auto w-full md:w-[90vw] lg:w-[40vw] max-w-2xl mt-10">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center ">
          Welcome to Doc Assistant
        </h2>
        <p className="text-gray-700 text-xs md:text-sm text-center ">
          Upload you documents and let Doc Assigstant uncover key insigts and
          answer your questions
        </p>

        {/* Upload or drag and drop files */}
        <div className="border border-gray-800 rounded-xl flex flex-col gap-5 justify-center p-5 md:p-8">
          <CloudUpload
            className="w-16 md:w-20 h-16 md:h-20 flex mx-auto"
            strokeWidth={1}
          />
          <div className="text-center text-sm md:text-base">
            Drag & drop your files
          </div>
          <p className="text-center">OR</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            // multiple
            accept=".pdf, .txt, .doc, .docs"
            onChange={handleFileChange}
          />
          <button
            className="w-full md:w-auto mx-auto bg-gray-900 text-white border rounded-lg px-6 py-2 text-sm md:text-base"
            onClick={handleBrowseFiles}
          >
            Browse files
          </button>

          <p className="text-xs md:text-sm text-center">
            PDF, Wordpad or Text, Max 100 MB each.
          </p>
        </div>

        {/* Track the prgress of files */}
        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold mt-2">Uploading files</h2>
            <div className="flex gap-2 mt-2 items-center">
              <File className="w-4 h-4" />
              <div className="flex flex-col items-center justify-center"></div>
              <div className="w-full h-1.5 rounded-lg bg-gray-300">
                <div
                  className="w-full h-full bg-black"
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="text-sm text-black text-center">
                  {progress}%
                </div>
              </div>
              <div>
                {progress < 100 ? (
                  <X className="w-5 h-5 text-red-500 text-bold" />
                ) : (
                  <Check className="w-5 h-5 text-green-500 text-bold" />
                )}
              </div>
            </div>
          </div>
        )}
        {/* PENDING: PROGRESS TRACKING AND CANCELLING THE UPLOAD */}
        <div className="text-red-500 font-semibold">
          {inValidFiles.map((invalidFile) => {
            return (
              <div key={invalidFile.name + 1}>
                {invalidFile.name} {invalidFile.error}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
