import Navbar from "../components/Navbar";

import FileExplorer from "../components/FileExplorer";

import CodeEditor from "../components/CodeEditor";

import SandpackPreviewPanel from "../components/SandpackPreview";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="layout">
        <div className="sidebar-container">
          <FileExplorer />
        </div>

        <div className="editor-container">
          <CodeEditor />
        </div>

        <div className="preview-container">
          <SandpackPreviewPanel />
        </div>
      </div>
    </>
  );
};

export default Home;