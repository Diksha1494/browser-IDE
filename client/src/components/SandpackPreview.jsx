import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import useIDEStore from "../store/useIDEStore";

const SandpackPreviewPanel = () => {
  const {
    files,
    runTrigger,
    dependencies,
  } = useIDEStore();

  const sandpackFiles = {};

  Object.keys(files).forEach(
    (path) => {
      const item = files[path];

      if (item.type === "file") {
        sandpackFiles[`/${path}`] = {
          code:
            item.file.contents,
        };
      }
    }
  );

  return (
    <SandpackProvider
      key={runTrigger}
      template="react"
      files={sandpackFiles}
      customSetup={{
        entry: "/src/index.js",

        dependencies,
      }}
    >
      <SandpackLayout>
        <SandpackPreview
          style={{
            height: "100vh",
          }}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default SandpackPreviewPanel;