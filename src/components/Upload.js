import { CloudUpload, UploadCloud } from "lucide-react";
import Logo from "./Logo";
import { useRef, useState } from "react";

const Upload = () => {
  const inputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inValidFiles, setInValidFiles] = useState([{}]);

  const MAX_SIZE = 2 * 1024 * 1024;

  const allowedTypes = ["application/pdf", "text/plain", "application/msword"];

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
    <div className="px-4 py-2 ">
      <Logo />

      <div className="flex flex-col gap-4 mx-auto w-[40vw] mt-10">
        {/* Title */}
        <h2 className="text-3xl font-bold">Welcome to Doc Assistant</h2>
        <p className="text-gray-700 text-sm">
          Upload you documents and let Doc Assigstant uncover key insigts and
          answer your questions
        </p>

        {/* Upload or drag and drop files */}
        <div className="border border-gray-800 rounded-xl flex flex-col gap-5 justify-center p-5">
          <CloudUpload className="w-20 h-20 flex mx-auto" />
          <div>Drag & drop your files</div>
          <p>OR</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple
            accept=".pdf, .txt, .doc, .docs"
            onChange={handleFileChange}
          />
          <button
            className="w-[10vw]  mx-auto bg-gray-900 text-white border rounded-lg px-4 py-2"
            onClick={handleBrowseFiles}
          >
            Browse files
          </button>

          <p>PDF, Wordpad or Text, Max 100 MB each.</p>
        </div>

        {/* Track the prgress of files */}
        {selectedFiles.length > 0 && (
          <div className="flex justify-start">Uploading files</div>
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

export default Upload;
