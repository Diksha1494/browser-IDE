import Editor from "@monaco-editor/react";

import useIDEStore from "../store/useIDEStore";

const CodeEditor = () => {
  const {
    files,
    activeFile,
    updateFileContent,
  } = useIDEStore();

  const currentFile =
    files[activeFile];

  if (
    !currentFile ||
    currentFile.type !== "file"
  ) {
    return (
      <div
        style={{
          padding: "20px",
        }}
      >
        Select a file
      </div>
    );
  }

  return (
    <Editor
      height="100vh"
      theme="vs-dark"
      language="javascript"
      value={
        currentFile.file.contents
      }
      onChange={(value) =>
        updateFileContent(
          activeFile,
          value || ""
        )
      }
    />
  );
};

export default CodeEditor;