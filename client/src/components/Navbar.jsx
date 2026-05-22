import useIDEStore from "../store/useIDEStore";

const Navbar = () => {
  const {
    setRunTrigger,
    installPackage,
    dependencies,
  } = useIDEStore();

  const handleInstall = () => {
    const packageName = prompt(
      "Enter npm package name"
    );

    if (packageName) {
      installPackage(
        packageName
      );
    }
  };

  return (
    <div className="navbar">
      <h2>Browser IDE</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={handleInstall}
        >
          Install Package
        </button>

        <button
          className="run-btn"
          onClick={() =>
            setRunTrigger()
          }
        >
          ▶ Run
        </button>
      </div>
    </div>
  );
};

export default Navbar;