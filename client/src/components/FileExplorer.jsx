import useIDEStore from "../store/useIDEStore";

const FileExplorer = () => {
  const {
    files,
    setActiveFile,
    createFile,
    createFolder,
    deleteItem,
    renameItem,
  } = useIDEStore();

  const handleCreateFile = () => {
    const name = prompt(
      "Enter file path"
    );

    if (name) {
      createFile(name);
    }
  };

  const handleCreateFolder = () => {
    const name = prompt(
      "Enter folder path"
    );

    if (name) {
      createFolder(name);
    }
  };

  const handleRename = (oldPath) => {
    const newPath = prompt(
      "Enter new name",
      oldPath
    );

    if (newPath) {
      renameItem(oldPath, newPath);
    }
  };

  return (
    <div className="sidebar">
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={handleCreateFile}>
          New File
        </button>

        <button
          onClick={handleCreateFolder}
        >
          New Folder
        </button>
      </div>

      {Object.keys(files).map((path) => {
        const item = files[path];

        return (
          <div
            key={path}
            className="file"
          >
            <span
              onClick={() => {
                if (
                  item.type === "file"
                ) {
                  setActiveFile(path);
                }
              }}
            >
              {item.type === "folder"
                ? "📁"
                : "📄"}{" "}
              {path}
            </span>

            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <button
                onClick={() =>
                  handleRename(path)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteItem(path)
                }
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileExplorer;