import { create } from "zustand";
import API from "../services/api";

const defaultFiles = {
  "src/App.js": {
    type: "file",

    file: {
      contents: `
export default function App() {
  return (
    <>
      <h1>Hello Browser IDE</h1>
      <h2>MongoDB Connected</h2>
    </>
  );
}
`,
    },
  },

  "src/index.js": {
    type: "file",

    file: {
      contents: `
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(<App />);
`,
    },
  },
};

const savedFiles = JSON.parse(
  localStorage.getItem("files")
);

const useIDEStore = create(
  (set, get) => ({
    // FILES
    files:
      savedFiles || defaultFiles,

    // ACTIVE FILE
    activeFile: "src/App.js",

    // RUN BUTTON
    runTrigger: 0,

    // PROJECT ID
    currentProjectId: null,

    // =========================
    // RUN PROJECT
    // =========================

    setRunTrigger: () =>
      set((state) => ({
        runTrigger:
          state.runTrigger + 1,
      })),

    // =========================
    // ACTIVE FILE
    // =========================

    setActiveFile: (file) =>
      set({
        activeFile: file,
      }),

    // =========================
    // LOAD PROJECT
    // =========================

    loadProject: async () => {
      try {
        const res =
          await API.get(
            "/load"
          );

        if (res.data?.files) {
          set({
            files: res.data.files,
          });

          localStorage.setItem(
            "files",
            JSON.stringify(
              res.data.files
            )
          );

          console.log(
            "Project Loaded"
          );
        }
      } catch (error) {
        console.log(
          "Load Error:",
          error
        );
      }
    },

    // =========================
    // SAVE PROJECT
    // =========================

    saveProject: async (
      updatedFiles
    ) => {
      try {
        console.log(updatedFiles);
        await API.post(
          "/save",
          {
            files: updatedFiles,
          }
        );

        console.log(
          "Saved to MongoDB"
        );
      } catch (error) {
        console.log(
          "Save Error:",
          error
        );
      }
    },

     
    updateFileContent: async (
      path,
      content
    ) => {
      const updatedFiles = {
        ...get().files,

        [path]: {
          ...get().files[path],

          file: {
            contents: content,
          },
        },
      };

      // UPDATE STATE
      set({
        files: updatedFiles,
      });

      // SAVE LOCAL
      localStorage.setItem(
        "files",
        JSON.stringify(updatedFiles)
      );

      // SAVE MONGO
      await get().saveProject(
        updatedFiles
      );
    },


    createFile: async (path) => {
      const updatedFiles = {
        ...get().files,

        [path]: {
          type: "file",

          file: {
            contents: "",
          },
        },
      };

      set({
        files: updatedFiles,
      });

      localStorage.setItem(
        "files",
        JSON.stringify(updatedFiles)
      );

      await get().saveProject(
        updatedFiles
      );
    },

    
    createFolder: async (
      path
    ) => {
      const updatedFiles = {
        ...get().files,

        [path]: {
          type: "folder",
        },
      };

      set({
        files: updatedFiles,
      });

      localStorage.setItem(
        "files",
        JSON.stringify(updatedFiles)
      );

      await get().saveProject(
        updatedFiles
      );
    },

    deleteItem: async (path) => {
      const updatedFiles = {
        ...get().files,
      };

      Object.keys(
        updatedFiles
      ).forEach((key) => {
        if (
          key === path ||
          key.startsWith(
            path + "/"
          )
        ) {
          delete updatedFiles[key];
        }
      });

      set({
        files: updatedFiles,
      });

      localStorage.setItem(
        "files",
        JSON.stringify(updatedFiles)
      );

      await get().saveProject(
        updatedFiles
      );
    },
dependencies: {
  react: "latest",
  "react-dom": "latest",
},
    
    renameItem: async (
      oldPath,
      newPath
    ) => {
      const updatedFiles = {
        ...get().files,
      };

      updatedFiles[newPath] =
        updatedFiles[oldPath];

      delete updatedFiles[oldPath];

      set({
        files: updatedFiles,

        activeFile:
          get().activeFile ===
          oldPath
            ? newPath
            : get().activeFile,
      });

      localStorage.setItem(
        "files",
        JSON.stringify(updatedFiles)
      );

      await get().saveProject(
        updatedFiles
      );
    },
  })
);

export default useIDEStore;