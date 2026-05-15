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

  const handleUploadFiles = async (filesToUpload) => {
    console.log("Uploading files...", filesToUpload);
    if (filesToUpload.length === 0) return;
    console.log("filesToUpload -->", filesToUpload);

    for (const selectedFile of filesToUpload) {
      // Creating form data
      const formData = new FormData();
      formData.append("file", selectedFile.file);

      try {
        const res = await axios.post(`${apiURL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (ProgressEvent) => {
            const percentComplated = Math.round(
              (ProgressEvent.loaded * 100) / ProgressEvent.total,
            );
            setSelectedFiles((prev) => {
              return prev.map((file) => {
                if (file.id === selectedFile.id) {
                  return {
                    ...file,
                    progress: percentComplated,
                    status: "uploading",
                  };
                }
                return file;
              });
            });
          },
        });

        console.log("API response -->", res.data);

        setSelectedFiles((prev) => {
          return prev.map((file) => {
            if (file.id === selectedFile.id) {
              return {
                ...file,
                progress: 100,
                status: "uploaded",
              };
            }
            return file;
          });
        });
      } catch (err) {
        console.log(err);
        setSelectedFiles((prev) => {
          return prev.map((file) => {
            if (file.id === selectedFile.id) {
              return {
                ...file,
                progress: 0,
                status: "error",
              };
            }
            return file;
          });
        });
      }
    }
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

    // Formatting the valid files to be stored in state
    const formattedFiles = validFiles.map((file) => {
      return {
        id: crypto.randomUUID(),
        file,
        status: "pending",
        progress: 0,
      };
    });
    setSelectedFiles(formattedFiles);

    handleUploadFiles(formattedFiles);
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
            multiple
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
            PDF, Wordpad or Text, Max 2 MB each.
          </p>
        </div>

        
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
        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-4 mb-5">
            <h2 className="text-sm font-bold mt-2">Uploading files</h2>

            {selectedFiles.map((item) => (
              <div key={item.id} className=" p-3">
                <div className="flex items-center gap-2 mb-2">
                  <File className="w-4 h-4" />

                  <p className="text-sm truncate">{item.file.name}</p>
                </div>

                <div className="w-full h-2 rounded-lg bg-gray-300 overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-300"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs">{item.progress}%</p>

                  <div>
                    {item.status === "uploaded" ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : item.status === "error" ? (
                      <X className="w-5 h-5 text-red-500" />
                    ) : (
                      <p className="text-xs text-gray-500">Uploading...</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
