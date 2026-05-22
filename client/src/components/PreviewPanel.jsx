import { useEffect } from "react";
import useIDEStore from "../store/useIDEStore";

export default function PreviewPanel() {
  const previewUrl = useIDEStore((state) => state.previewUrl);
  const previewSrcDoc = useIDEStore((state) => state.previewSrcDoc);
  const previewMode = useIDEStore((state) => state.previewMode);
  const isRunning = useIDEStore((state) => state.isRunning);
  const sandboxStatus = useIDEStore((state) => state.sandboxStatus);
  const runtimeErrors = useIDEStore((state) => state.runtimeErrors);
  const addRuntimeError = useIDEStore((state) => state.addRuntimeError);
  const appendTerminalLog = useIDEStore((state) => state.appendTerminalLog);

  useEffect(() => {
    const handler = (event) => {
      if (event.data?.source !== "browser-ide-preview") return;

      const { type, payload } = event.data;
      if (type === "console") {
        const line = `[preview:${payload.level}] ${payload.message}`;
        appendTerminalLog(line);
      }

      if (type === "error") {
        const line = `[preview:error] ${payload}`;
        addRuntimeError(String(payload));
        appendTerminalLog(line);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [addRuntimeError, appendTerminalLog]);

  return (
    <aside className="preview-panel" aria-label="Live preview">
      <div className="panel-title">
        <div>
          <strong>Preview</strong>
          <span>{previewMode === "idle" ? sandboxStatus : previewMode}</span>
        </div>
      </div>

      <div className="preview-frame-wrap">
        {isRunning && <div className="preview-loading">Running project...</div>}

        {runtimeErrors.length > 0 && (
          <div className="preview-errors">
            <strong>Runtime errors</strong>
            {runtimeErrors.map((error, index) => (
              <pre key={`${error}-${index}`}>{error}</pre>
            ))}
          </div>
        )}

        {previewMode === "static" && previewSrcDoc ? (
          <iframe
            key={previewSrcDoc}
            title="Static preview"
            srcDoc={previewSrcDoc}
            sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-scripts"
          />
        ) : previewUrl ? (
          <iframe
            key={previewUrl}
            title="Live preview"
            src={previewUrl}
            sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts"
          />
        ) : (
          <div className="empty-state">
            Click Run to render the current HTML, CSS, and JavaScript files.
          </div>
        )}
      </div>
    </aside>
  );
}
