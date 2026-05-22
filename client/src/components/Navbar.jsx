import useIDEStore from "../store/useIDEStore";

const Navbar = () => {
  const { setRunTrigger } =
    useIDEStore();

  return (
    <div className="navbar">
      <h2>Browser IDE</h2>

      <button
        className="run-btn"
        onClick={() =>
          setRunTrigger()
        }
      >
        ▶ Run
      </button>
    </div>
  );
};

export default Navbar;