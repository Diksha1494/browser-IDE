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