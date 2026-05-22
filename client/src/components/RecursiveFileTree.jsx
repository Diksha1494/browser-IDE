import { useState } from "react";
import { sortNodes } from "../services/fileSystem";

export default function RecursiveFileTree({
  node,
  activeFile,
  onOpenFile,
  onCreateFile,
  onCreateFolder,
  onRename,
  onDelete,
  level = 0,
}) {
  const [expanded, setExpanded] = useState(true);

  if (node.type === "file") {
    return (
      <div className="tree-row-wrap">
        <button
          type="button"
          className={node.path === activeFile ? "tree-row active" : "tree-row"}
          style={{ paddingLeft: `${level * 14 + 10}px` }}
          onClick={() => onOpenFile(node.path)}
        >
          <span className="tree-icon">JS</span>
          <span className="tree-label">{node.name}</span>
        </button>
        <div className="tree-actions">
          <button type="button" title="Rename" onClick={() => onRename(node.path)}>
            R
          </button>
          <button type="button" title="Delete" onClick={() => onDelete(node.path)}>
            X
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tree-folder">
      {node.name !== "root" && (
        <div className="tree-row-wrap">
          <button
            type="button"
            className="tree-row folder"
            style={{ paddingLeft: `${level * 14 + 10}px` }}
            onClick={() => setExpanded((value) => !value)}
          >
            <span className="tree-icon">{expanded ? "v" : ">"}</span>
            <span className="tree-label">{node.name}</span>
          </button>
          <div className="tree-actions">
            <button type="button" title="New file" onClick={() => onCreateFile(node.path)}>
              F
            </button>
            <button type="button" title="New folder" onClick={() => onCreateFolder(node.path)}>
              D
            </button>
            <button type="button" title="Rename" onClick={() => onRename(node.path)}>
              R
            </button>
            <button type="button" title="Delete" onClick={() => onDelete(node.path)}>
              X
            </button>
          </div>
        </div>
      )}

      {(expanded || node.name === "root") &&
        sortNodes(node.children).map((child) => (
          <RecursiveFileTree
            key={child.path}
            node={child}
            activeFile={activeFile}
            onOpenFile={onOpenFile}
            onCreateFile={onCreateFile}
            onCreateFolder={onCreateFolder}
            onRename={onRename}
            onDelete={onDelete}
            level={node.name === "root" ? level : level + 1}
          />
        ))}
    </div>
  );
}
