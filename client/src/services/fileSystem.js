export const defaultFileTree = {
  type: "folder",
  name: "root",
  path: "",
  children: [
    {
      type: "file",
      name: "package.json",
      path: "package.json",
      contents: JSON.stringify(
        {
          scripts: {
            dev: "vite --host 0.0.0.0",
            build: "vite build",
            preview: "vite preview --host 0.0.0.0",
          },
          dependencies: {
            "@vitejs/plugin-react": "latest",
            vite: "latest",
            react: "latest",
            "react-dom": "latest",
          },
          devDependencies: {},
        },
        null,
        2
      ),
    },
    {
      type: "file",
      name: "index.html",
      path: "index.html",
      contents: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sandbox App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
    },
    {
      type: "folder",
      name: "src",
      path: "src",
      children: [
        {
          type: "file",
          name: "main.jsx",
          path: "src/main.jsx",
          contents: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
        },
        {
          type: "file",
          name: "App.jsx",
          path: "src/App.jsx",
          contents: `export default function App() {
  return (
    <main className="app">
      <h1>Hello Sandbox</h1>
      <p>Edit this React app and watch the preview update.</p>
    </main>
  );
}
`,
        },
        {
          type: "file",
          name: "style.css",
          path: "src/style.css",
          contents: `body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  background: #101318;
  color: white;
}

.app {
  min-height: 100vh;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 12px;
}

h1 {
  color: #7dd3fc;
}
`,
        },
      ],
    },
  ],
};

export function joinPath(parentPath, name) {
  return parentPath ? `${parentPath}/${name}` : name;
}

export function getParentPath(path) {
  const parts = path.split("/");
  parts.pop();
  return parts.join("/");
}

export function detectLanguage(path = "") {
  const ext = path.split(".").pop()?.toLowerCase();
  const languages = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    json: "json",
    css: "css",
    html: "html",
    md: "markdown",
    py: "python",
  };

  return languages[ext] ?? "plaintext";
}

export function sortNodes(nodes = []) {
  return [...nodes].sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function findNode(tree, path) {
  if (!path) return tree;
  if (tree.path === path) return tree;

  for (const child of tree.children ?? []) {
    const found = findNode(child, path);
    if (found) return found;
  }

  return null;
}

export function updateNodePath(node, parentPath = "") {
  const nextPath = node.name === "root" ? "" : joinPath(parentPath, node.name);
  const nextNode = { ...node, path: nextPath };

  if (nextNode.type === "folder") {
    nextNode.children = (nextNode.children ?? []).map((child) =>
      updateNodePath(child, nextPath)
    );
  }

  return nextNode;
}

export function updateNode(tree, path, updater) {
  if (tree.path === path) {
    return updateNodePath(updater(tree), getParentPath(path));
  }

  if (tree.type !== "folder") return tree;

  return {
    ...tree,
    children: tree.children.map((child) => updateNode(child, path, updater)),
  };
}

export function addNode(tree, parentPath, node) {
  return updateNode(tree, parentPath, (folder) => {
    if (folder.type !== "folder") return folder;
    const nextNode = updateNodePath(node, folder.path);
    return {
      ...folder,
      children: sortNodes([...(folder.children ?? []), nextNode]),
    };
  });
}

export function deleteNode(tree, path) {
  if (!path) return tree;

  if (tree.type !== "folder") return tree;

  return {
    ...tree,
    children: tree.children
      .filter((child) => child.path !== path)
      .map((child) => deleteNode(child, path)),
  };
}

export function collectFiles(tree) {
  if (tree.type === "file") return [tree];
  return (tree.children ?? []).flatMap(collectFiles);
}

export function getFirstFilePath(tree) {
  return collectFiles(tree)[0]?.path ?? "";
}

export function createFileNode(name, contents = "") {
  return {
    type: "file",
    name,
    path: name,
    contents,
  };
}

export function createFolderNode(name) {
  return {
    type: "folder",
    name,
    path: name,
    children: [],
  };
}
