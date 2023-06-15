import React, { useState } from "react";

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <input type="file" />
    </div>
  );
};

export default FileInput;
