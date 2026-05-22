import { collectFiles, findNode } from "./fileSystem";

export function detectProjectType(fileTree) {
  const hasHtml = collectFiles(fileTree).some((file) => file.path.endsWith(".html"));
  return hasHtml ? "static" : "javascript";
}

function getFile(fileTree, path) {
  const node = findNode(fileTree, path);
  return node?.type === "file" ? node.contents ?? "" : "";
}

function getFirstByExtension(fileTree, extension) {
  return collectFiles(fileTree).find((file) => file.path.endsWith(extension))?.contents ?? "";
}

function normalizeHtml(fileTree) {
  return getFile(fileTree, "index.html") || getFirstByExtension(fileTree, ".html") || "";
}

function stripLocalAssetTags(html) {
  return html
    .replace(/<link\b[^>]*href=["'][^"']+\.css["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*src=["'][^"']+\.js["'][^>]*>\s*<\/script>/gi, "");
}

function injectBefore(html, closingTag, content) {
  const index = html.toLowerCase().lastIndexOf(closingTag);
  if (index === -1) return `${html}\n${content}`;
  return `${html.slice(0, index)}${content}\n${html.slice(index)}`;
}

function collectPreviewAssets(fileTree) {
  const files = collectFiles(fileTree);
  const cssFiles = files.filter((file) => file.path.endsWith(".css"));
  const jsFiles = files.filter((file) => file.path.endsWith(".js"));

  return {
    css: cssFiles.map((file) => `/* ${file.path} */\n${file.contents ?? ""}`).join("\n\n"),
    js: jsFiles.map((file) => `// ${file.path}\n${file.contents ?? ""}`).join("\n\n"),
  };
}

export function buildPreviewSrcDoc(fileTree) {
  const html = stripLocalAssetTags(normalizeHtml(fileTree)) || "<main id=\"app\"></main>";
  const { css, js } = collectPreviewAssets(fileTree);

  const errorBridge = `
<script>
(() => {
  const send = (type, payload) => parent.postMessage({ source: "browser-ide-preview", type, payload }, "*");
  ["log", "warn", "error"].forEach((level) => {
    const original = console[level];
    console[level] = (...args) => {
      send("console", { level, message: args.map(String).join(" ") });
      original.apply(console, args);
    };
  });
  window.addEventListener("error", (event) => {
    send("error", event.message + " at line " + event.lineno);
  });
  window.addEventListener("unhandledrejection", (event) => {
    send("error", event.reason?.message || String(event.reason));
  });
})();
</script>`;

  let output = html;
  output = injectBefore(output, "</head>", `${errorBridge}\n<style>\n${css}\n</style>`);
  output = injectBefore(output, "</body>", `<script>\n${js}\n</script>`);
  return output;
}

export async function runProject(fileTree, callbacks) {
  const type = detectProjectType(fileTree);
  callbacks.log(`Running ${type} preview...`);
  callbacks.setPreview({
    mode: "static",
    srcDoc: buildPreviewSrcDoc(fileTree),
    url: "",
  });
}

export function stopProject(callbacks) {
  callbacks.setPreview({
    mode: "idle",
    url: "",
    srcDoc: "",
  });
  callbacks.log("Preview stopped.");
}
