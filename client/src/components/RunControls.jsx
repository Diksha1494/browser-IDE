import useIDEStore from "../store/useIDEStore";
import { runProject, stopProject } from "../services/runner";

export default function RunControls() {
  const fileTree = useIDEStore((state) => state.fileTree);
  const isRunning = useIDEStore((state) => state.isRunning);
  const previewMode = useIDEStore((state) => state.previewMode);
  const appendTerminalLog = useIDEStore((state) => state.appendTerminalLog);
  const setIsRunning = useIDEStore((state) => state.setIsRunning);
  const setPreviewUrl = useIDEStore((state) => state.setPreviewUrl);
  const setPreviewSrcDoc = useIDEStore((state) => state.setPreviewSrcDoc);
  const setPreviewMode = useIDEStore((state) => state.setPreviewMode);
  const setRuntimeErrors = useIDEStore((state) => state.setRuntimeErrors);
  const addRuntimeError = useIDEStore((state) => state.addRuntimeError);
  const setLastError = useIDEStore((state) => state.setLastError);

  const log = (message) => {
    const line = String(message);
    appendTerminalLog(line);
  };

  const setPreview = ({ mode, url, srcDoc }) => {
    setPreviewMode(mode);
    setPreviewUrl(url);
    setPreviewSrcDoc(srcDoc);
  };

  const run = async () => {
    if (isRunning) return;

    setRuntimeErrors([]);
    setLastError("");
    setIsRunning(true);
    setPreviewMode("loading");
    log("\r\n> Run");

    try {
      await runProject(fileTree, {
        log,
        setPreview,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Run failed.";
      addRuntimeError(message);
      setLastError(message);
      setPreviewMode("error");
      log(`Runtime error: ${message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const stop = () => {
    stopProject({
      log,
      setPreview,
    });
    setIsRunning(false);
  };

  return (
    <div className="run-controls" aria-label="Run controls">
      <button type="button" className="run-button" onClick={run} disabled={isRunning}>
        <span className={isRunning ? "spinner" : "play-icon"} />
        {isRunning ? "Running" : "Run"}
      </button>
      <button
        type="button"
        className="stop-button"
        onClick={stop}
        disabled={!isRunning && previewMode === "idle"}
      >
        <span className="stop-icon" />
        Stop
      </button>
    </div>
  );
}
