const mockFiles = [
  {
    id: 1,
    name: "Resume.pdf",
    type: "application/pdf",
    size: 245760, // bytes
    uploadedAt: new Date().toISOString(), // today
  },
  {
    id: 2,
    name: "Project_Documentation.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 1048576,
    uploadedAt: new Date().toISOString(), // today
  },
  {
    id: 3,
    name: "Notes.txt",
    type: "text/plain",
    size: 10240,
    uploadedAt: "2026-03-20T10:30:00Z", // previous
  },
  {
    id: 4,
    name: "Report.doc",
    type: "application/msword",
    size: 5097152,
    uploadedAt: "2026-03-18T08:15:00Z",
  },
];

export default mockFiles;
